import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, LogOut } from "lucide-react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <aside className="sidebar-container">
      <div className="logo-container">
        <div className="logo-icon">E</div>
        <span className="logo-text">EMS</span>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="user-section">
        <div className="user-profile">
          <img
            src={`https://ui-avatars.com/api/?name=${
              user?.name || "Admin"
            }&background=random`}
            alt="Profile"
            className="user-avatar"
          />
          <div className="user-info">
            <p className="user-info-text">{user?.name || "Admin User"}</p>
            <p className="user-role-text">Admin</p>
          </div>
        </div>
        <button onClick={logout} className="logout-btn">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
