import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Users, LogOut, X } from "lucide-react";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/employees", label: "Employees", icon: Users },
  ];

  return (
    <aside className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">E</div>
          <span className="logo-text">EMS</span>
        </div>
        <button onClick={onClose} className="close-sidebar-btn">
          <X size={24} />
        </button>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            onClick={onClose}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="user-section">
        <div className="user-profile">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || "Admin"
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
