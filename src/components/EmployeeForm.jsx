import { useState, useEffect } from "react";
import { Camera, X, Upload } from "lucide-react";
import "../styles/EmployeeForm.css";
import { GENDER_OPTIONS, STATE_OPTIONS } from "../data/dummyData";
import Button from "./common/Button";
const EmployeeForm = ({ employee, onSubmit, onCancel, isModal = false }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Male",
    dob: "",
    state: "",
    image: "",
    active: true,
  });
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName,
        gender: employee.gender,
        dob: employee.dob,
        state: employee.state,
        image: employee.image,
        active: employee.active,
      });
      setPreview(employee.image);
    }
  }, [employee]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <div className={isModal ? "" : "form-card"}>
      {!isModal && (
        <div className="form-header">
          <h2 className="form-title">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button onClick={onCancel} className="close-btn">
            <X size={20} />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-layout">
          <div className="image-upload-section">
            <div className="image-preview-container">
              {preview ? (
                <img src={preview} alt="Preview" className="preview-image" />
              ) : (
                <div className="placeholder-content">
                  <Camera size={32} />
                  <span className="placeholder-text">Upload Photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
            </div>
            <button
              type="button"
              className="upload-btn"
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              <Upload size={14} /> Choose Image
            </button>
          </div>
          <div className="fields-grid">
            <div className="full-width">
              <label className="form-field-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-field-input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-field-label">Gender</label>
              <select
                name="gender"
                className="form-field-input"
                value={formData.gender}
                onChange={handleChange}
              >
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-field-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="form-field-input"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-field-label">State</label>
              <select
                name="state"
                className="form-field-input"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {STATE_OPTIONS.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Active Employee</span>
              </label>
            </div>
          </div>
        </div>
        <div className="form-actions">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {employee ? "Save Changes" : "Add Employee"}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EmployeeForm;
