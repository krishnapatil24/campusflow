import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import { complaints as initialComplaints } from "../data/complaints";

const statusStyles = {
  Submitted: "status-neutral",
  Assigned: "status-blue",
  "In Progress": "status-orange",
  Resolved: "status-green",
};

const priorityStyles = {
  Low: "priority-low",
  Medium: "priority-medium",
  High: "priority-high",
};

function Complaints() {
  const navigate = useNavigate();

  const complaints = useMemo(() => {
    const stored = localStorage.getItem("campusflow_complaints");

    if (!stored) {
      return initialComplaints;
    }

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialComplaints;
    } catch {
      return initialComplaints;
    }
  }, []);

  return (
    <DashboardLayout>
      <section className="complaints-page">
        <div className="page-header-block">
          <div>
            <p className="eyebrow">Track</p>
            <h2>My Complaints</h2>
          </div>
          <p className="section-subtitle">Track issues you've reported around campus.</p>
        </div>

        {complaints.length === 0 ? (
          <div className="empty-state-card">
            <h3>No issues reported</h3>
            <p>Everything looks good. If you find a problem, report it here.</p>
            <button type="button" className="primary-btn" onClick={() => navigate("/report-issue")}>
              Report an Issue
            </button>
          </div>
        ) : (
          <div className="complaints-list">
            {complaints.map((complaint) => (
              <article key={complaint.id} className="complaint-card">
                <div className="complaint-card-header">
                  <div>
                    <p className="complaint-id">{complaint.id}</p>
                    <h3>{complaint.title}</h3>
                  </div>
                  <span className={`status-badge ${statusStyles[complaint.status] || "status-neutral"}`}>
                    {complaint.status}
                  </span>
                </div>

                <div className="complaint-meta-grid">
                  <span><strong>Category:</strong> {complaint.category}</span>
                  <span><strong>Location:</strong> {complaint.location}</span>
                  <span><strong>Date:</strong> {complaint.createdAt}</span>
                  <span>
                    <strong>Priority:</strong>{" "}
                    <span className={`priority-badge ${priorityStyles[complaint.priority] || "priority-medium"}`}>
                      {complaint.priority}
                    </span>
                  </span>
                </div>

                <button type="button" className="secondary-btn complaint-button" onClick={() => navigate(`/complaints/${complaint.id}`)}>
                  View Details
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default Complaints;
