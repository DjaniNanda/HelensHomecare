import { useState, useEffect, useCallback } from "react";
import { API } from "../../api/config";
import { PhoneIcon, MailIcon, TrashIcon, EditIcon, ArchiveIcon, XIcon } from "../icons";

const STATUS_LABELS = { ACTIVE: "Active", INACTIVE: "Inactive", ON_HOLD: "On Hold" };
const STATUS_COLORS = { ACTIVE: "badge--green", INACTIVE: "badge--muted", ON_HOLD: "badge--gold" };
const COUNTIES = ["GWINNETT","DEKALB","COBB","FULTON","CLAYTON","HENRY","MORROW","WALTON","ROCKDALE","FORSYTH"];
const STATUSES = ["ACTIVE","INACTIVE","ON_HOLD"];

const EMPTY_FORM = { fullName: "", phoneNumber: "", email: "", county: "", city: "", carePlan: "", notes: "", status: "ACTIVE" };

function toTitle(str) { return str ? str.charAt(0) + str.slice(1).toLowerCase() : ""; }

export default function AdminClients() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  const [filterStatus, setFilterStatus] = useState("");
  const [filterCounty, setFilterCounty] = useState("");

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
      if (filterCounty) params.append("county", filterCounty);
      const url = `${API.adminClients}${params.toString() ? "?" + params : ""}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load clients.");
      setRows(await res.json());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [filterStatus, filterCounty]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setFormErr({}); setEditing(null); setModal("create"); };
  const openEdit   = (row) => {
    setForm({ fullName: row.fullName, phoneNumber: row.phoneNumber, email: row.email,
      county: row.county, city: row.city, carePlan: row.carePlan ?? "", notes: row.notes ?? "", status: row.status });
    setFormErr({}); setEditing(row); setModal("edit");
  };

  const setF = (k, v) => { setForm(p => ({ ...p, [k]: v })); setFormErr(p => ({ ...p, [k]: undefined })); };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())    e.fullName    = "Required";
    if (!form.phoneNumber.trim()) e.phoneNumber = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.county)             e.county      = "Required";
    if (!form.city.trim())        e.city        = "Required";
    return e;
  };

  const save = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setFormErr(errs); return; }
    setSaving(true);
    try {
      const method = modal === "create" ? "POST" : "PUT";
      const url    = modal === "create" ? API.adminClients : API.adminClient(editing.id);
      const res = await fetch(url, { method, credentials: "include",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Save failed.");
      setModal(null); load();
    } catch (e) { alert(e.message); }
    finally { setSaving(false); }
  };

  const archive = async (id) => {
    if (!confirm("Archive this client?")) return;
    try { await fetch(API.adminClientArchive(id), { method: "PATCH", credentials: "include" }); load(); }
    catch { alert("Archive failed."); }
  };

  const del = async (id) => {
    if (!confirm("Delete this client? This cannot be undone.")) return;
    try { await fetch(API.adminClient(id), { method: "DELETE", credentials: "include" }); load(); }
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
          <select value={filterCounty} onChange={e => setFilterCounty(e.target.value)} className="ap-filter-select">
            <option value="">All Counties</option>
            {COUNTIES.map(c => <option key={c} value={c}>{toTitle(c)}</option>)}
          </select>
          <div className="ap-filter-divider" />
          <button className="ap-filter-reset" onClick={() => { setFilterStatus(""); setFilterCounty(""); }}>Reset</button>
        </div>
        <button className="ap-btn-create" onClick={openCreate}>+ New Client</button>
      </div>

      {error   && <div className="ap-alert ap-alert--err">{error}</div>}
      {loading && <div className="ap-loading">Loading clients</div>}

      {!loading && !error && (
        <>
          <div className="ap-count">{rows.length} client{rows.length !== 1 ? "s" : ""}</div>
          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr><th>Name</th><th>Contact</th><th>Location</th><th>Status</th><th>Care Plan</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {rows.length === 0 && <tr><td colSpan={6} className="ap-empty">No clients found.</td></tr>}
                {rows.map(row => (
                  <tr key={row.id}>
                    <td data-label="Name" className="ap-td-name">{row.fullName}</td>
                    <td data-label="Contact">
                      <div className="ap-contact-cell">
                        <a href={`tel:${row.phoneNumber}`} className="ap-action-call">
                          <PhoneIcon size={13} />
                          {row.phoneNumber}
                        </a>
                        <a href={`mailto:${row.email}`} className="ap-action-email">
                          <MailIcon size={13} />
                          {row.email}
                        </a>
                      </div>
                    </td>
                    <td data-label="Location">{row.city}, {toTitle(row.county)}</td>
                    <td data-label="Status"><span className={`badge ${STATUS_COLORS[row.status]}`}>{STATUS_LABELS[row.status]}</span></td>
                    <td data-label="Care Plan" className="ap-td-plan">
                      {row.carePlan
                        ? row.carePlan.slice(0, 60) + (row.carePlan.length > 60 ? "…" : "")
                        : <em className="ap-none">—</em>}
                    </td>
                    <td data-label="">
                      <div className="ap-td-actions">
                        <button className="ap-btn-edit"    onClick={() => openEdit(row)} title="Edit"><EditIcon size={15} /></button>
                        <button className="ap-btn-archive" onClick={() => archive(row.id)} title="Archive"><ArchiveIcon size={15} /></button>
                        <button className="ap-btn-del"     onClick={() => del(row.id)} title="Delete"><TrashIcon size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {modal && (
        <div className="ap-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="ap-modal">
            <div className="ap-modal-header">
              <h2>{modal === "create" ? "New Client" : "Edit Client"}</h2>
              <button className="ap-modal-close" onClick={() => setModal(null)}><XIcon size={16} /></button>
            </div>
            <div className="ap-modal-body">
              <div className="ap-mfield-row">
                <Field label="Full Name *" error={formErr.fullName}>
                  <input value={form.fullName} onChange={e => setF("fullName", e.target.value)} className={`ap-minput${formErr.fullName?" ap-minput--err":""}`} placeholder="Jane Smith" />
                </Field>
                <Field label="Phone *" error={formErr.phoneNumber}>
                  <input value={form.phoneNumber} onChange={e => setF("phoneNumber", e.target.value)} className={`ap-minput${formErr.phoneNumber?" ap-minput--err":""}`} placeholder="(770) 000-0000" />
                </Field>
              </div>
              <Field label="Email *" error={formErr.email}>
                <input type="email" value={form.email} onChange={e => setF("email", e.target.value)} className={`ap-minput${formErr.email?" ap-minput--err":""}`} placeholder="jane@email.com" />
              </Field>
              <div className="ap-mfield-row">
                <Field label="County *" error={formErr.county}>
                  <select value={form.county} onChange={e => setF("county", e.target.value)} className={`ap-minput ap-mselect${formErr.county?" ap-minput--err":""}`}>
                    <option value="">Select…</option>
                    {COUNTIES.map(c => <option key={c} value={c}>{toTitle(c)}</option>)}
                  </select>
                </Field>
                <Field label="City *" error={formErr.city}>
                  <input value={form.city} onChange={e => setF("city", e.target.value)} className={`ap-minput${formErr.city?" ap-minput--err":""}`} placeholder="Lawrenceville" />
                </Field>
              </div>
              <Field label="Status">
                <select value={form.status} onChange={e => setF("status", e.target.value)} className="ap-minput ap-mselect">
                  {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </Field>
              <Field label="Care Plan">
                <textarea rows={4} value={form.carePlan} onChange={e => setF("carePlan", e.target.value)} className="ap-minput ap-mtextarea" placeholder="Describe the client's care plan…" />
              </Field>
              <Field label="Notes">
                <textarea rows={3} value={form.notes} onChange={e => setF("notes", e.target.value)} className="ap-minput ap-mtextarea" placeholder="Additional notes…" />
              </Field>
            </div>
            <div className="ap-modal-footer">
              <button className="ap-modal-cancel" onClick={() => setModal(null)}>Cancel</button>
              <button className="ap-modal-save" onClick={save} disabled={saving}>
                {saving ? "Saving…" : modal === "create" ? "Create Client" : "Save Changes"}
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
