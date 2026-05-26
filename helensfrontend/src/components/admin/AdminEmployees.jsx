import { useState, useEffect, useCallback } from "react";
import { API } from "../../api/config";
import { PhoneIcon, MailIcon, TrashIcon, EditIcon, ArchiveIcon, XIcon } from "../icons";

const STATUS_LABELS = { ACTIVE: "Active", ON_LEAVE: "On Leave", TERMINATED: "Terminated" };
const STATUS_COLORS = { ACTIVE: "badge--green", ON_LEAVE: "badge--gold", TERMINATED: "badge--err" };
const COUNTIES = ["GWINNETT","DEKALB","COBB","FULTON","CLAYTON","HENRY","MORROW","WALTON","ROCKDALE","FORSYTH"];
const STATUSES = ["ACTIVE","ON_LEAVE","TERMINATED"];
const DAYS_OF_WEEK = ["MON","TUE","WED","THU","FRI","SAT","SUN"];

const EMPTY_FORM = {
  fullName: "", phoneNumber: "", email: "", city: "",
  assignedZones: [], availableDays: [], notes: "", status: "ACTIVE",
};

function toTitle(str) { return str ? str.charAt(0) + str.slice(1).toLowerCase() : ""; }

// Parse legacy free-text availability or array stored as comma-string back to array
function parseAvailableDays(availability) {
  if (!availability) return [];
  if (Array.isArray(availability)) return availability;
  // If it looks like day codes separated by commas
  const parts = availability.split(",").map(s => s.trim().toUpperCase());
  return parts.filter(p => DAYS_OF_WEEK.includes(p));
}

export default function AdminEmployees() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  const [filterStatus, setFilterStatus] = useState("");
  const [filterZone,   setFilterZone]   = useState("");

  const [modal,   setModal]   = useState(null);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [saving,  setSaving]  = useState(false);
  const [formErr, setFormErr] = useState({});

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.append("status", filterStatus);
      if (filterZone)   params.append("zone",   filterZone);
      const url = `${API.adminEmployees}${params.toString() ? "?" + params : ""}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load employees.");
      setRows(await res.json());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [filterStatus, filterZone]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setFormErr({}); setEditing(null); setModal("create"); };
  const openEdit   = (row) => {
    setForm({
      fullName: row.fullName, phoneNumber: row.phoneNumber, email: row.email,
      city: row.city, assignedZones: row.assignedZones ?? [],
      availableDays: parseAvailableDays(row.availability),
      notes: row.notes ?? "", status: row.status,
    });
    setFormErr({}); setEditing(row); setModal("edit");
  };

  const setF = (k, v) => { setForm(p => ({ ...p, [k]: v })); setFormErr(p => ({ ...p, [k]: undefined })); };
  const toggleZone = (zone) => setForm(p => ({
    ...p, assignedZones: p.assignedZones.includes(zone)
      ? p.assignedZones.filter(z => z !== zone)
      : [...p.assignedZones, zone],
  }));
  const toggleDay = (day) => setForm(p => ({
    ...p, availableDays: p.availableDays.includes(day)
      ? p.availableDays.filter(d => d !== day)
      : [...p.availableDays, day],
  }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())    e.fullName    = "Required";
    if (!form.phoneNumber.trim()) e.phoneNumber = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.city.trim())        e.city        = "Required";
    return e;
  };

  const save = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErr(errs); return; }
    setSaving(true);
    try {
      const method = modal === "create" ? "POST" : "PUT";
      const url    = modal === "create" ? API.adminEmployees : API.adminEmployee(editing.id);
      // Send availableDays as comma-joined string into the `availability` field
      const payload = {
        ...form,
        availability: form.availableDays.length > 0 ? form.availableDays.join(",") : "",
      };
      delete payload.availableDays;
      const res = await fetch(url, {
        method, credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed.");
      setModal(null); load();
    } catch (e) { alert(e.message); }
    finally { setSaving(false); }
  };

  const archive = async (id) => {
    if (!confirm("Archive this employee?")) return;
    try { await fetch(API.adminEmployeeArchive(id), { method: "PATCH", credentials: "include" }); load(); }
    catch { alert("Archive failed."); }
  };

  const del = async (id) => {
    if (!confirm("Delete this employee? This cannot be undone.")) return;
    try { await fetch(API.adminEmployee(id), { method: "DELETE", credentials: "include" }); load(); }
    catch { alert("Delete failed."); }
  };

  return (
    <div className="ap-panel">

      <div className="ap-panel-actions">
        <div className="ap-filters">
          <span className="ap-filter-label">Filter</span>
          <div className="ap-filter-divider" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="ap-filter-select">
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
          <select value={filterZone} onChange={e => setFilterZone(e.target.value)} className="ap-filter-select">
            <option value="">All Zones</option>
            {COUNTIES.map(c => <option key={c} value={c}>{toTitle(c)}</option>)}
          </select>
          <div className="ap-filter-divider" />
          <button className="ap-filter-reset" onClick={() => { setFilterStatus(""); setFilterZone(""); }}>Reset</button>
        </div>
        <button className="ap-btn-create" onClick={openCreate}>+ New Employee</button>
      </div>

      {error   && <div className="ap-alert ap-alert--err">{error}</div>}
      {loading && <div className="ap-loading">Loading employees</div>}

      {!loading && !error && (
        <>
          <div className="ap-count">{rows.length} employee{rows.length !== 1 ? "s" : ""}</div>
          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr><th>Name</th><th>Contact</th><th>City</th><th>Zones</th><th>Available Days</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {rows.length === 0 && <tr><td colSpan={7} className="ap-empty">No employees found.</td></tr>}
                {rows.map(row => {
                  const days = parseAvailableDays(row.availability);
                  return (
                    <tr key={row.id}>
                      <td data-label="Name" className="ap-td-name">{row.fullName}</td>
                      <td data-label="Contact">
                        <div className="ap-contact-cell">
                          <a href={`tel:${row.phoneNumber}`} className="ap-action-call">
                            <PhoneIcon size={13} />{row.phoneNumber}
                          </a>
                          <a href={`mailto:${row.email}`} className="ap-action-email">
                            <MailIcon size={13} />{row.email}
                          </a>
                        </div>
                      </td>
                      <td data-label="City">{row.city}</td>
                      <td data-label="Zones">
                        <div className="ap-zones">
                          {(row.assignedZones ?? []).slice(0, 3).map(z => (
                            <span key={z} className="badge badge--sm badge--navy">{toTitle(z)}</span>
                          ))}
                          {(row.assignedZones ?? []).length > 3 && (
                            <span className="badge badge--sm badge--muted">+{row.assignedZones.length - 3}</span>
                          )}
                          {(row.assignedZones ?? []).length === 0 && <em className="ap-none">None</em>}
                        </div>
                      </td>
                      <td data-label="Available Days">
                        <div className="ap-zones">
                          {days.length > 0
                            ? days.map(d => <span key={d} className="badge badge--sm badge--gold">{d}</span>)
                            : <em className="ap-none">—</em>
                          }
                        </div>
                      </td>
                      <td data-label="Status"><span className={`badge ${STATUS_COLORS[row.status]}`}>{STATUS_LABELS[row.status]}</span></td>
                      <td data-label="">
                        <div className="ap-td-actions">
                          <button className="ap-btn-edit"    onClick={() => openEdit(row)} title="Edit"><EditIcon size={15} /></button>
                          <button className="ap-btn-archive" onClick={() => archive(row.id)} title="Archive"><ArchiveIcon size={15} /></button>
                          <button className="ap-btn-del"     onClick={() => del(row.id)} title="Delete"><TrashIcon size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {modal && (
        <div className="ap-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="ap-modal">
            <div className="ap-modal-header">
              <h2>{modal === "create" ? "New Employee" : "Edit Employee"}</h2>
              <button className="ap-modal-close" onClick={() => setModal(null)}><XIcon size={16} /></button>
            </div>
            <div className="ap-modal-body">
              <div className="ap-mfield-row">
                <Field label="Full Name *" error={formErr.fullName}>
                  <input value={form.fullName} onChange={e => setF("fullName", e.target.value)} className={`ap-minput${formErr.fullName?" ap-minput--err":""}`} placeholder="John Doe" />
                </Field>
                <Field label="Phone *" error={formErr.phoneNumber}>
                  <input value={form.phoneNumber} onChange={e => setF("phoneNumber", e.target.value)} className={`ap-minput${formErr.phoneNumber?" ap-minput--err":""}`} placeholder="(770) 000-0000" />
                </Field>
              </div>
              <div className="ap-mfield-row">
                <Field label="Email *" error={formErr.email}>
                  <input type="email" value={form.email} onChange={e => setF("email", e.target.value)} className={`ap-minput${formErr.email?" ap-minput--err":""}`} placeholder="john@email.com" />
                </Field>
                <Field label="City *" error={formErr.city}>
                  <input value={form.city} onChange={e => setF("city", e.target.value)} className={`ap-minput${formErr.city?" ap-minput--err":""}`} placeholder="Lawrenceville" />
                </Field>
              </div>
              <Field label="Assigned Zones">
                <div className="ap-zone-grid">
                  {COUNTIES.map(c => (
                    <button key={c} type="button"
                      className={`ap-zone-chip${form.assignedZones.includes(c) ? " ap-zone-chip--active" : ""}`}
                      onClick={() => toggleZone(c)}
                    >
                      {toTitle(c)}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Available Days">
                <div className="ap-zone-grid ap-days-grid">
                  {DAYS_OF_WEEK.map(d => (
                    <button key={d} type="button"
                      className={`ap-zone-chip${form.availableDays.includes(d) ? " ap-zone-chip--active" : ""}`}
                      onClick={() => toggleDay(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={e => setF("status", e.target.value)} className="ap-minput ap-mselect">
                  {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </Field>
              <Field label="Notes">
                <textarea rows={3} value={form.notes} onChange={e => setF("notes", e.target.value)} className="ap-minput ap-mtextarea" placeholder="Additional notes…" />
              </Field>
            </div>
            <div className="ap-modal-footer">
              <button className="ap-modal-cancel" onClick={() => setModal(null)}>Cancel</button>
              <button className="ap-modal-save" onClick={save} disabled={saving}>
                {saving ? "Saving…" : modal === "create" ? "Create Employee" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="ap-mfield">
      <label className="ap-mlabel">{label}</label>
      {children}
      {error && <span className="ap-merr">{error}</span>}
    </div>
  );
}