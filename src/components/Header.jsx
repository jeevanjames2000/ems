import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="header-logo">
          <div className="logo-icon">E</div>
          <span className="logo-text">Employee Management</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-profile">
          <div className="header-avatar">{user?.name?.charAt(0) || "A"}</div>
          <span className="header-username">{user?.name || "Admin"}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
