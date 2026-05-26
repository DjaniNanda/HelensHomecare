import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminAssessments from "./AdminAssessments";
import AdminClients     from "./AdminClients";
import AdminEmployees   from "./AdminEmployees";
import AdminCaregiverApplications from "./AdminCaregiverApplications";
import { ClipboardIcon, UsersIcon, BriefcaseIcon, HeartIcon } from "../icons";
import "../../componentscss/AdminDashboard.css";

const NAV = [
  { id: "assessments",           label: "Assessments",    Icon: ClipboardIcon },
  { id: "clients",               label: "Clients",        Icon: UsersIcon },
  { id: "employees",             label: "Employees",      Icon: BriefcaseIcon },
  { id: "caregiver-applications",label: "Applications",   Icon: HeartIcon },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("assessments");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const activeNav = NAV.find(n => n.id === tab);

  return (
    <div className="ad-shell">
      {sidebarOpen && <div className="ad-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`ad-sidebar ${sidebarOpen ? "ad-sidebar--open" : ""}`}>
        <div className="ad-sidebar-brand">
          <div className="ad-brand-logo">H</div>
          <div className="ad-brand-text">
            <span className="ad-brand-name">Helen's Home Care</span>
            <span className="ad-brand-sub">Admin Panel</span>
          </div>
        </div>

        <div className="ad-sidebar-sep" />
        <div className="ad-nav-label">Navigation</div>

        <nav className="ad-nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`ad-nav-item${tab === n.id ? " ad-nav-item--active" : ""}`}
              onClick={() => { setTab(n.id); setSidebarOpen(false); }}
            >
              <span className="ad-nav-icon"><n.Icon size={17} /></span>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="ad-sidebar-footer">
          <div className="ad-user-card">
            <div className="ad-user-avatar">{user?.username?.[0]?.toUpperCase() ?? "A"}</div>
            <div>
              <span className="ad-user-name">{user?.username ?? "Admin"}</span>
              <span className="ad-user-role">Administrator</span>
            </div>
          </div>
          <button className="ad-logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </aside>

      <main className="ad-main">
        <header className="ad-topbar">
          <button className="ad-hamburger" onClick={() => setSidebarOpen(o => !o)} aria-label="Open menu">
            <span /><span /><span />
          </button>
          <h1 className="ad-topbar-title">
            {activeNav && (
              <>
                <span className="ad-topbar-icon"><activeNav.Icon size={18} /></span>
                {activeNav.label}
              </>
            )}
          </h1>
          <a href="/" className="ad-topbar-site">← View Site</a>
        </header>

        <div className="ad-content">
          {tab === "assessments" && <AdminAssessments />}
          {tab === "clients"     && <AdminClients     />}
          {tab === "employees"   && <AdminEmployees   />}
          {tab === "caregiver-applications" && <AdminCaregiverApplications />}
        </div>
      </main>
    </div>
  );
}