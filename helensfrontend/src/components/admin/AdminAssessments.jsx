import { useState, useEffect, useCallback } from "react";
import { API } from "../../api/config";
import { PhoneIcon, MailIcon, TrashIcon, CheckIcon, XIcon } from "../icons";

const STATUS_LABELS = { PENDING: "Pending", CONTACTED: "Contacted", CLOSED: "Closed" };
const STATUS_COLORS = { PENDING: "badge--gold", CONTACTED: "badge--blue", CLOSED: "badge--muted" };

const CARE_LABELS = {
  HOME_CARE: "Home Care",
  UNSURE:    "Unsure",
};

const COUNTIES   = ["GWINNETT","DEKALB","COBB","FULTON","CLAYTON","HENRY","MORROW","WALTON","ROCKDALE","FORSYTH"];
const STATUSES   = ["PENDING","CONTACTED","CLOSED"];
const CARE_TYPES = ["HOME_CARE","UNSURE"];

function toTitle(str) { return str ? str.charAt(0) + str.slice(1).toLowerCase() : ""; }

export default function AdminAssessments() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  const [filterStatus,   setFilterStatus]   = useState("");
  const [filterCounty,   setFilterCounty]   = useState("");
  const [filterCareType, setFilterCareType] = useState("");

  const [editingId,  setEditingId]  = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [savingId,   setSavingId]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams();
      if (filterStatus)   params.append("status",     filterStatus);
      if (filterCounty)   params.append("county",     filterCounty);
      if (filterCareType) params.append("typeOfCare", filterCareType);
      const url = `${API.adminAssessments}${params.toString() ? "?" + params : ""}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load assessments.");
      setRows(await res.json());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [filterStatus, filterCounty, filterCareType]);

  useEffect(() => { load(); }, [load]);

  const saveStatus = async (id) => {
    setSavingId(id);
    try {
      const res = await fetch(API.adminAssessmentStatus(id), {
        method: "PATCH", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: editStatus }),
      });
      if (!res.ok) throw new Error("Update failed.");
      setEditingId(null); load();
    } catch (e) { alert(e.message); }
    finally { setSavingId(null); }
  };

  const deleteRow = async (id) => {
    if (!confirm("Delete this assessment? This cannot be undone.")) return;
    try {
      await fetch(API.adminAssessment(id), { method: "DELETE", credentials: "include" });
      load();
    } catch { alert("Delete failed."); }
  };

  const resetFilters = () => { setFilterStatus(""); setFilterCounty(""); setFilterCareType(""); };

  return (
    <div className="ap-panel">

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
        <select value={filterCareType} onChange={e => setFilterCareType(e.target.value)} className="ap-filter-select">
          <option value="">All Types</option>
          {CARE_TYPES.map(t => <option key={t} value={t}>{CARE_LABELS[t]}</option>)}
        </select>
        <div className="ap-filter-divider" />
        <button className="ap-filter-reset" onClick={resetFilters}>Reset</button>
      </div>

      {error   && <div className="ap-alert ap-alert--err">{error}</div>}
      {loading && <div className="ap-loading">Loading assessments</div>}

      {!loading && !error && (
        <>
          <div className="ap-count">{rows.length} assessment{rows.length !== 1 ? "s" : ""}</div>
          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Name</th><th>Contact</th><th>Location</th>
                  <th>Type of Care</th><th>Status</th><th>Submitted</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr><td colSpan={7} className="ap-empty">No assessments found.</td></tr>
                )}
                {rows.map(row => (
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
                    <td data-label="Location">{row.city}, {toTitle(row.county ?? "")}</td>
                    <td data-label="Type">
                      <span className="badge badge--navy">{CARE_LABELS[row.typeOfCare]}</span>
                    </td>
                    <td data-label="Status">
                      {editingId === row.id ? (
                        <div className="ap-inline-edit">
                          <select
                            value={editStatus}
                            onChange={e => setEditStatus(e.target.value)}
                            className="ap-inline-select"
                          >
                            {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                          </select>
                          <button
                            className="ap-inline-save"
                            onClick={() => saveStatus(row.id)}
                            disabled={savingId === row.id}
                            title="Save"
                          >
                            {savingId === row.id ? "…" : <CheckIcon size={13} />}
                          </button>
                          <button className="ap-inline-cancel" onClick={() => setEditingId(null)} title="Cancel">
                            <XIcon size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className={`badge ${STATUS_COLORS[row.status]} badge--clickable`}
                          title="Click to change status"
                          onClick={() => { setEditingId(row.id); setEditStatus(row.status); }}
                        >
                          {STATUS_LABELS[row.status]}
                        </button>
                      )}
                    </td>
                    <td data-label="Submitted" className="ap-td-date">
                      {row.submittedAt ? new Date(row.submittedAt).toLocaleDateString() : "—"}
                    </td>
                    <td data-label="">
                      <div className="ap-td-actions">
                        <button className="ap-btn-del" onClick={() => deleteRow(row.id)} title="Delete">
                          <TrashIcon size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}