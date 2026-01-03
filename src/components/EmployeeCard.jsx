import { forwardRef } from "react";
import "../styles/EmployeeCard.css";
import StatusBadge from "./common/StatusBadge";
const EmployeeCard = forwardRef(({ employee }, ref) => {
  if (!employee) return null;
  return (
    <div className="employee-id-card" ref={ref}>
      <div className="card-header">
        <div className="card-logo">EMS</div>
        <div className="card-title">Employee Identity Card</div>
      </div>
      <div className="card-body">
        <div className="card-image-container">
          <img
            src={employee.image || "https://via.placeholder.com/150"}
            alt={employee.fullName}
            className="card-image"
            crossOrigin="anonymous"
          />
        </div>
        <div className="card-info">
          <h2 className="card-name">{employee.fullName}</h2>
          <p className="card-role">{employee.role || "Employee"}</p>
          <div className="card-details">
            <div className="detail-row">
              <span className="detail-label">ID No:</span>
              <span className="detail-value">{employee.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Gender:</span>
              <span className="detail-value">{employee.gender}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">DOB:</span>
              <span className="detail-value">
                {new Date(employee.dob).toLocaleDateString()}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">State:</span>
              <span className="detail-value">{employee.state}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <StatusBadge status={employee.active} />
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="signature-box">
          <div className="signature-line"></div>
          <span>Authorized Signature</span>
        </div>
        <div className="card-company">Employee Management System</div>
      </div>
    </div>
  );
});
EmployeeCard.displayName = "EmployeeCard";
export default EmployeeCard;
