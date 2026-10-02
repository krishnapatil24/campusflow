import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: "◫" },
  { label: "Events", to: "/events", icon: "◌" },
  { label: "My Events", to: "/my-events", icon: "▣" },
  { label: "Report Issue", to: "/report-issue", icon: "⚑" },
  { label: "My Complaints", to: "/complaints", icon: "◍" },
  { label: "Announcements", to: "/announcements", icon: "◐" },
];

const defaultProfile = {
  name: "Krish Sharma",
};

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const storedProfile = localStorage.getItem("campusflow_profile");
  const parsedProfile = storedProfile ? JSON.parse(storedProfile) : defaultProfile;
  const studentName = parsedProfile?.name || defaultProfile.name;

  const handleLogout = () => {
    localStorage.removeItem("campusflow_logged_in");
    navigate("/");
  };

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">CF</div>
          <div>
            <strong>CampusFlow</strong>
            <small>Student Portal</small>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="profile-mini" onClick={() => navigate("/profile")}>
            <span className="profile-mini-avatar">{studentName.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>
            <span>
              <strong>{studentName}</strong>
              <small>Student</small>
            </span>
          </button>
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
