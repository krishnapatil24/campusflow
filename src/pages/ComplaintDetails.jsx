import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import { complaints as initialComplaints } from "../data/complaints";

const statusOrder = ["Submitted", "Assigned", "In Progress", "Resolved"];

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

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const complaint = useMemo(() => {
    const stored = localStorage.getItem("campusflow_complaints");
    const list = stored ? JSON.parse(stored) : initialComplaints;

    if (!Array.isArray(list)) {
      return initialComplaints.find((item) => item.id === id) || null;
    }

    return list.find((item) => item.id === id) || initialComplaints.find((item) => item.id === id) || null;
  }, [id]);

  if (!complaint) {
    return (
      <DashboardLayout>
        <section className="page-card placeholder-card">
          <p className="eyebrow">Complaint</p>
          <h2>Complaint not found</h2>
          <div className="placeholder-box">
            <p>The complaint could not be found.</p>
          </div>
        </section>
      </DashboardLayout>
    );
  }

  const currentIndex = Math.max(0, statusOrder.indexOf(complaint.status));

  return (
    <DashboardLayout>
      <section className="complaint-details-page">
        <div className="complaint-details-card">
          <div className="details-header">
            <div>
              <p className="eyebrow">Complaint Details</p>
              <h2>{complaint.title}</h2>
            </div>
            <span className={`status-badge ${statusStyles[complaint.status] || "status-neutral"}`}>
              {complaint.status}
            </span>
          </div>

          <div className="complaint-detail-grid">
            <div>
              <strong>Complaint ID</strong>
              <span>{complaint.id}</span>
            </div>
            <div>
              <strong>Category</strong>
              <span>{complaint.category}</span>
            </div>
            <div>
              <strong>Location</strong>
              <span>{complaint.location}</span>
            </div>
            <div>
              <strong>Priority</strong>
              <span className={`priority-badge ${priorityStyles[complaint.priority] || "priority-medium"}`}>
                {complaint.priority}
              </span>
            </div>
            <div>
              <strong>Created</strong>
              <span>{complaint.createdAt}</span>
            </div>
            <div>
              <strong>Status</strong>
              <span>{complaint.status}</span>
            </div>
          </div>

          <p className="event-long-description">{complaint.description}</p>

          <button type="button" className="secondary-btn complaint-button" onClick={() => navigate("/complaints")}>
            Back to My Complaints
          </button>
        </div>

        <div className="timeline-card">
          <h3>Tracking Timeline</h3>
          <div className="timeline">
            {statusOrder.map((status, index) => {
              const update = complaint.updates?.find((entry) => entry.status === status);
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const statusClass = isCompleted ? "completed" : isCurrent ? "current" : "inactive";

              return (
                <div key={status} className={`timeline-item ${statusClass}`}>
                  <span className="timeline-dot" />
                  <h4>{status}</h4>
                  <p>{update?.message || "Waiting for update."}</p>
                  <small>{update?.date || complaint.createdAt}</small>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ComplaintDetails;
