import { useState, useEffect, useCallback } from "react";
import { API } from "../../api/config";
import { PhoneIcon, MailIcon, TrashIcon, XIcon, CheckIcon } from "../icons";

const STATUS_LABELS = {
  PENDING:   "Pending",
  CONTACTED: "Contacted",
  HIRED:     "Hired",
  REJECTED:  "Rejected",
};
const STATUS_COLORS = {
  PENDING:   "badge--gold",
  CONTACTED: "badge--blue",
  HIRED:     "badge--green",
  REJECTED:  "badge--err",
};

const COUNTIES = ["GWINNETT","DEKALB","COBB","FULTON","CLAYTON","HENRY","MORROW","WALTON","ROCKDALE","FORSYTH"];
const STATUSES = ["PENDING","CONTACTED","HIRED","REJECTED"];

function toTitle(str) {
  if (!str) return "";
  return str.charAt(0) + str.slice(1).toLowerCase();
}

function DayBadges({ days }) {
  if (!days || days.length === 0) return <em className="ap-none">—</em>;
  return (
    <div className="ap-zones">
      {days.map(d => (
        <span key={d} className="badge badge--sm badge--navy">{d}</span>
      ))}
    </div>
  );
}

export default function AdminCaregiverApplications() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  const [filterStatus, setFilterStatus] = useState("");
  const [filterCounty, setFilterCounty] = useState("");

  const [detailRow,   setDetailRow]   = useState(null);
  const [statusEdit,  setStatusEdit]  = useState("");
  const [saving,      setSaving]      = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.append("status", filterStatus);
      if (filterCounty) params.append("county", filterCounty);
      const url = `${API.adminCaregiverApplications}${params.toString() ? "?" + params : ""}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load caregiver applications.");
      setRows(await res.json());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [filterStatus, filterCounty]);

  useEffect(() => { load(); }, [load]);

  const openDetail = (row) => {
    setDetailRow(row);
    setStatusEdit(row.status);
  };

  const saveStatus = async () => {
    if (!detailRow || statusEdit === detailRow.status) { setDetailRow(null); return; }
    setSaving(true);
    try {
      const res = await fetch(API.adminCaregiverApplicationStatus(detailRow.id), {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusEdit }),
      });
      if (!res.ok) throw new Error("Status update failed.");
      setDetailRow(null);
      load();
    } catch (e) { alert(e.message); }
    finally { setSaving(false); }
  };

  const del = async (id) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    try {
      await fetch(API.adminCaregiverApplication(id), { method: "DELETE", credentials: "include" });
      load();
    } catch { alert("Delete failed."); }
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
      </div>

      {error   && <div className="ap-alert ap-alert--err">{error}</div>}
      {loading && <div className="ap-loading">Loading applications…</div>}

      {!loading && !error && (
        <>
          <div className="ap-count">{rows.length} application{rows.length !== 1 ? "s" : ""}</div>
          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Available Days</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr><td colSpan={7} className="ap-empty">No caregiver applications found.</td></tr>
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
                    <td data-label="Location">{row.city}, {toTitle(row.county)}</td>
                    <td data-label="Available Days"><DayBadges days={row.availableDays} /></td>
                    <td data-label="Status">
                      <span className={`badge ${STATUS_COLORS[row.status]}`}>{STATUS_LABELS[row.status]}</span>
                    </td>
                    <td data-label="Submitted" className="ap-td-date">
                      {new Date(row.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td data-label="">
                      <div className="ap-td-actions">
                        <button className="ap-btn-edit" onClick={() => openDetail(row)} title="Update status">
                          <CheckIcon size={15} />
                        </button>
                        <button className="ap-btn-del" onClick={() => del(row.id)} title="Delete">
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

      {/* Detail / Status Modal */}
      {detailRow && (
        <div className="ap-modal-overlay" onClick={e => e.target === e.currentTarget && setDetailRow(null)}>
          <div className="ap-modal">
            <div className="ap-modal-header">
              <h2>Application — {detailRow.fullName}</h2>
              <button className="ap-modal-close" onClick={() => setDetailRow(null)}><XIcon size={16} /></button>
            </div>
            <div className="ap-modal-body">

              {/* Info summary */}
              <div className="ap-detail-grid">
                <div className="ap-detail-item">
                  <span className="ap-detail-label">Phone</span>
                  <a href={`tel:${detailRow.phoneNumber}`} className="ap-action-call">
                    <PhoneIcon size={13} />{detailRow.phoneNumber}
                  </a>
                </div>
                <div className="ap-detail-item">
                  <span className="ap-detail-label">Email</span>
                  <a href={`mailto:${detailRow.email}`} className="ap-action-email">
                    <MailIcon size={13} />{detailRow.email}
                  </a>
                </div>
                <div className="ap-detail-item">
                  <span className="ap-detail-label">Location</span>
                  <span>{detailRow.city}, {toTitle(detailRow.county)}</span>
                </div>
                <div className="ap-detail-item">
                  <span className="ap-detail-label">Available Days</span>
                  <DayBadges days={detailRow.availableDays} />
                </div>
                <div className="ap-detail-item">
                  <span className="ap-detail-label">Submitted</span>
                  <span>{new Date(detailRow.submittedAt).toLocaleString("en-US")}</span>
                </div>
              </div>

              {/* Status update */}
              <div className="ap-mfield" style={{ marginTop: "20px" }}>
                <label className="ap-mlabel">Update Status</label>
                <select
                  value={statusEdit}
                  onChange={e => setStatusEdit(e.target.value)}
                  className="ap-minput ap-mselect"
                >
                  {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>

            </div>
            <div className="ap-modal-footer">
              <button className="ap-modal-cancel" onClick={() => setDetailRow(null)}>Cancel</button>
              <button className="ap-modal-save" onClick={saveStatus} disabled={saving}>
                {saving ? "Saving…" : "Save Status"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}