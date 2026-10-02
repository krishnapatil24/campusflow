import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import { complaints as initialComplaints } from "../data/complaints";

const defaultForm = {
  title: "",
  category: "",
  location: "",
  priority: "Medium",
  description: "",
};

const categoryOptions = [
  "Internet",
  "Electrical",
  "Hostel",
  "Classroom",
  "Cleanliness",
  "Security",
  "Other",
];

function ReportIssue() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [photoName, setPhotoName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  const validate = () => {
    const nextErrors = {};

    if (!formData.title.trim()) nextErrors.title = "Title is required.";
    if (!formData.category) nextErrors.category = "Please select a category.";
    if (!formData.location.trim()) nextErrors.location = "Location is required.";
    if (!formData.description.trim()) nextErrors.description = "Description is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setPhotoName(file ? file.name : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const timestamp = Date.now();
    const complaintId = `CF-${String(1000 + (timestamp % 9000))}`;
    const createdAt = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

    const newComplaint = {
      id: complaintId,
      title: formData.title.trim(),
      category: formData.category,
      location: formData.location.trim(),
      priority: formData.priority,
      description: formData.description.trim(),
      status: "Submitted",
      createdAt,
      updates: [
        {
          status: "Submitted",
          date: createdAt,
          message: "Issue reported by student.",
        },
      ],
    };

    const currentComplaints = JSON.parse(localStorage.getItem("campusflow_complaints") || "[]");
    const mergedComplaints = [...(Array.isArray(currentComplaints) ? currentComplaints : initialComplaints), newComplaint];

    localStorage.setItem("campusflow_complaints", JSON.stringify(mergedComplaints));
    setSubmittedComplaint(newComplaint);
    setIsSubmitted(true);
    setFormData(defaultForm);
    setPhotoName("");
  };

  return (
    <DashboardLayout>
      <section className="report-issue-page">
        <div className="page-header-block">
          <div>
            <p className="eyebrow">Support</p>
            <h2>Report a Campus Issue</h2>
          </div>
          <p className="section-subtitle">Help us improve the campus by reporting a problem.</p>
        </div>

        {!isSubmitted ? (
          <form className="complaint-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid-two">
              <label>
                <span>Issue Title</span>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Wi-Fi not working in hostel"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <small className="field-error">{errors.title}</small>}
              </label>

              <label>
                <span>Category</span>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select a category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <small className="field-error">{errors.category}</small>}
              </label>
            </div>

            <div className="form-grid-two">
              <label>
                <span>Location</span>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Hostel Block B, Room 204"
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && <small className="field-error">{errors.location}</small>}
              </label>

              <label>
                <span>Priority</span>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
            </div>

            <label>
              <span>Description</span>
              <textarea
                name="description"
                rows="6"
                placeholder="Describe the problem in detail..."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <small className="field-error">{errors.description}</small>}
            </label>

            <label className="file-upload-label">
              <span>Photo</span>
              <div className="upload-box">
                <input type="file" onChange={handleFileChange} />
                {photoName ? <strong>{photoName}</strong> : <span>No file selected</span>}
              </div>
            </label>

            <button type="submit" className="primary-btn submit-btn">
              Submit Issue
            </button>
          </form>
        ) : (
          <div className="success-panel">
            <div className="success-badge">✓</div>
            <h3>Issue submitted successfully</h3>
            <p className="success-copy">Complaint ID:</p>
            <strong>{submittedComplaint?.id}</strong>
            <p className="success-copy">Your issue has been recorded and can now be tracked.</p>
            <button type="button" className="primary-btn" onClick={() => navigate("/complaints")}>
              Track Complaint
            </button>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default ReportIssue;
