import { useState, useEffect } from "react";
import { employeeService } from "../services/employeeService";
import { Plus, Search, Edit2, Trash2, Printer, Filter } from "lucide-react";
import EmployeeForm from "../components/EmployeeForm";
import { GENDER_OPTIONS } from "../data/dummyData";
import toast from "react-hot-toast";
import "../styles/EmployeeList.css";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  useEffect(() => {
    loadEmployees();
  }, []);
  useEffect(() => {
    filterData();
  }, [employees, searchTerm, filterGender, filterStatus]);
  const loadEmployees = () => {
    const data = employeeService.getAll();
    setEmployees(data);
  };
  const filterData = () => {
    let result = employees;
    if (searchTerm) {
      result = result.filter((emp) =>
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterGender !== "All") {
      result = result.filter((emp) => emp.gender === filterGender);
    }
    if (filterStatus !== "All") {
      const isActive = filterStatus === "Active";
      result = result.filter((emp) => emp.active === isActive);
    }
    setFilteredEmployees(result);
  };
  const handleAddStart = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };
  const handleEditStart = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      employeeService.delete(id);
      toast.success("Employee deleted successfully");
      loadEmployees();
    }
  };
  const handleFormSubmit = (data) => {
    if (editingEmployee) {
      employeeService.update(editingEmployee.id, data);
      toast.success("Employee updated successfully");
    } else {
      employeeService.add(data);
      toast.success("Employee added successfully");
    }
    setShowForm(false);
    loadEmployees();
  };
  const handlePrint = () => {
    window.print();
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  if (showForm) {
    return (
      <EmployeeForm
        employee={editingEmployee}
        onSubmit={handleFormSubmit}
        onCancel={() => setShowForm(false)}
      />
    );
  }
  return (
    <div className="employee-page">
      <div className="page-header">
        <h1 className="page-title">Employees</h1>
        <div className="header-actions">
          <button
            onClick={handlePrint}
            className="emp-btn emp-btn-outline show-on-print-hover"
          >
            <Printer size={18} /> Print
          </button>
          <button
            onClick={handleAddStart}
            className="emp-btn emp-btn-primary no-print"
          >
            <Plus size={18} /> Add Employee
          </button>
        </div>
      </div>
      <div className="filters-card no-print">
        <div className="filters-wrapper">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="emp-input search-input"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <Filter size={18} className="filter-icon" />
            <select
              className="emp-input filter-select"
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <option value="All">All Genders</option>
              {GENDER_OPTIONS.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="emp-input filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <div className="table-card">
        <div className="table-responsive">
          <table className="employee-table">
            <thead className="table-head">
              <tr>
                <th className="table-th">Employee</th>
                <th className="table-th">Details</th>
                <th className="table-th">Status</th>
                <th className="table-th no-print">Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.875rem" }}>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="table-row">
                    <td className="table-td">
                      <div className="employee-info">
                        <img
                          src={emp.image || "https://via.placeholder.com/40"}
                          alt=""
                          className="employee-avatar"
                        />
                        <div>
                          <div className="employee-name">{emp.fullName}</div>
                          <div className="employee-id">{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-td">
                      <div className="details-column">
                        <span className="detail-item">
                          <span className="detail-label">Gender:</span>{" "}
                          {emp.gender}
                        </span>
                        <span className="detail-item">
                          <span className="detail-label">DOB:</span>{" "}
                          {formatDate(emp.dob)}
                        </span>
                        <span className="detail-item">
                          <span className="detail-label">State:</span>{" "}
                          {emp.state}
                        </span>
                      </div>
                    </td>
                    <td className="table-td">
                      <button
                        onClick={() => {
                          const newStatus = !emp.active;
                          employeeService.update(emp.id, {
                            ...emp,
                            active: newStatus,
                          });
                          toast.success(
                            `Employee ${newStatus ? "activated" : "deactivated"
                            } successfully`
                          );
                          loadEmployees();
                        }}
                        className="status-toggle"
                        style={{
                          backgroundColor: emp.active ? "#10b981" : "#e5e7eb",
                        }}
                        title={emp.active ? "Deactivate" : "Activate"}
                      >
                        <span
                          className="toggle-handle"
                          style={{
                            transform: emp.active
                              ? "translateX(20px)"
                              : "translateX(0)",
                          }}
                        />
                      </button>
                    </td>
                    <td className="table-td no-print">
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEditStart(emp)}
                          className="emp-btn emp-btn-outline icon-btn edit-btn"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="emp-btn emp-btn-outline icon-btn delete-btn"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state">
                    No employees found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EmployeeList;
