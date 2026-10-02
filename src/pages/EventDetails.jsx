import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import { events } from "../data/events";

function EventDetails() {
  const { id } = useParams();
  const eventId = Number(id);
  const event = events.find((item) => item.id === eventId);

  const registeredEvents = useMemo(() => {
    const raw = localStorage.getItem("campusflow_registered_events");
    if (!raw) return [];

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, [id]);

  const isAlreadyRegistered = registeredEvents.includes(eventId);
  const [registered, setRegistered] = useState(isAlreadyRegistered);
  const [showMessage, setShowMessage] = useState(false);
  const [count, setCount] = useState(event?.registeredCount ?? 0);

  if (!event) {
    return (
      <DashboardLayout>
        <section className="page-card placeholder-card">
          <p className="eyebrow">Event not found</p>
          <h2>Event unavailable</h2>
          <div className="placeholder-box">
            <p>The event you are looking for could not be found.</p>
          </div>
        </section>
      </DashboardLayout>
    );
  }

  const handleRegister = () => {
    if (registered) return;

    const stored = JSON.parse(localStorage.getItem("campusflow_registered_events") || "[]");
    const nextRegistered = [...new Set([...stored, eventId])];
    localStorage.setItem("campusflow_registered_events", JSON.stringify(nextRegistered));

    setRegistered(true);
    setCount((current) => current + 1);
    setShowMessage(true);
  };

  return (
    <DashboardLayout>
      <section className="event-detail-page">
        <div className="event-detail-hero">
          <img src={event.image} alt={event.title} />
        </div>

        <div className="event-detail-card">
          <div className="event-detail-head">
            <div>
              <span className="event-category-badge">{event.category}</span>
              <h2>{event.title}</h2>
            </div>
            <button
              type="button"
              className={registered ? "registered-btn" : "primary-btn detail-register-btn"}
              onClick={handleRegister}
            >
              {registered ? "✓ Registered" : "Register Now"}
            </button>
          </div>

          {showMessage && <p className="success-message">You're registered for this event.</p>}

          <p className="event-long-description">{event.description}</p>

          <div className="event-detail-grid">
            <div><strong>Date</strong><span>{new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span></div>
            <div><strong>Time</strong><span>{event.time}</span></div>
            <div><strong>Location</strong><span>{event.location}</span></div>
            <div><strong>Organizer</strong><span>{event.organizer}</span></div>
            <div><strong>Capacity</strong><span>{event.capacity}</span></div>
            <div><strong>Registered</strong><span>{count}</span></div>
          </div>

          <div className="event-tags">
            {event.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default EventDetails;
