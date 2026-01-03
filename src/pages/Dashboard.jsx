import { useState } from "react";
import { Users, UserCheck, UserX } from "lucide-react";
import "../styles/Dashboard.css";

const StatCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="stat-card">
    <div
      className="stat-icon-wrapper"
      style={{ backgroundColor: bg, color: color }}
    >
      <Icon size={30} />
    </div>
    <div className="stat-info">
      <p className="stat-label">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>

      <div className="stats-grid">
        <StatCard
          title="Total Employees"
          value={stats.total}
          icon={Users}
          color="#4f46e5"
          bg="#e0e7ff"
        />
        <StatCard
          title="Active Employees"
          value={stats.active}
          icon={UserCheck}
          color="#10b981"
          bg="#d1fae5"
        />
        <StatCard
          title="Inactive Employees"
          value={stats.inactive}
          icon={UserX}
          color="#ef4444"
          bg="#fee2e2"
        />
      </div>
    </div>
  );
};

export default Dashboard;
