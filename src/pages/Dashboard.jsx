import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import EventCard from "../components/EventCard";
import { announcements as announcementData } from "../data/announcements";
import { events } from "../data/events";
import { complaints as mockComplaints } from "../data/complaints";

function Dashboard() {
  const navigate = useNavigate();
  const upcomingEvents = useMemo(() => events.slice(0, 3), []);

  const [registeredCount, setRegisteredCount] = useState(0);
  const [profileName, setProfileName] = useState("Krish Sharma");

  useEffect(() => {
    const raw = localStorage.getItem("campusflow_registered_events");
    if (!raw) {
      setRegisteredCount(0);
    } else {
      try {
        const parsed = JSON.parse(raw);
        setRegisteredCount(Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        setRegisteredCount(0);
      }
    }

    const storedProfile = localStorage.getItem("campusflow_profile");
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        if (parsed?.name) setProfileName(parsed.name);
      } catch {
        setProfileName("Krish Sharma");
      }
    }
  }, []);

  const complaintData = (() => {
    const stored = localStorage.getItem("campusflow_complaints");
    if (!stored) return mockComplaints.slice(0, 2);

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.slice(0, 2) : mockComplaints.slice(0, 2);
    } catch {
      return mockComplaints.slice(0, 2);
    }
  })();

  const recentAnnouncements = announcementData.slice(0, 3);

  const stats = [
    { label: "Upcoming Events", value: String(upcomingEvents.length) },
    { label: "Registered Events", value: String(registeredCount) },
    { label: "Open Issues", value: String(complaintData.filter((item) => item.status !== "Resolved").length || 2) },
    { label: "Announcements", value: String(announcementData.length) },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Good morning, {profileName.split(" ")[0]}</h2>
          <p className="dashboard-subtitle">Here's what's happening around your campus.</p>
        </div>
      </div>

      <div className="stats-grid dashboard-stats">
        {stats.map((item) => (
          <div key={item.label} className="stat-box">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <section className="dashboard-panel">
        <div className="panel-header">
          <h3>Upcoming Events</h3>
        </div>

        <div className="event-grid compact-grid">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="panel-header">
          <h3>Recent Complaints</h3>
          <button type="button" className="text-button" onClick={() => navigate("/complaints")}>
            View All Complaints
          </button>
        </div>

        <div className="complaint-list">
          {complaintData.map((complaint) => (
            <div key={complaint.id || complaint.title} className="list-row">
              <div>
                <h4>{complaint.title}</h4>
              </div>
              <span className={`status-badge ${complaint.status.toLowerCase().replace(/\s+/g, "-")}`}>
                {complaint.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="panel-header">
          <h3>Announcements</h3>
          <button type="button" className="text-button" onClick={() => navigate("/announcements")}>
            View All Announcements
          </button>
        </div>

        <ul className="announcement-list">
          {recentAnnouncements.map((announcement) => (
            <li key={announcement.id}>{announcement.title}</li>
          ))}
        </ul>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
