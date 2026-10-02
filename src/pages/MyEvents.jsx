import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import EventCard from "../components/EventCard";
import { events } from "../data/events";

function MyEvents() {
  const navigate = useNavigate();

  const registeredIds = useMemo(() => {
    const raw = localStorage.getItem("campusflow_registered_events");
    if (!raw) return [];

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, []);

  const registeredEvents = events.filter((event) => registeredIds.includes(event.id));
  const today = new Date();
  const upcomingEvents = registeredEvents.filter((event) => new Date(event.date) >= today);
  const pastEvents = registeredEvents.filter((event) => new Date(event.date) < today);

  const emptyState = (
    <div className="empty-state-card">
      <h3>No events yet</h3>
      <p>Explore campus events and register for something interesting.</p>
      <button type="button" className="primary-btn" onClick={() => navigate("/events")}>
        Explore Events
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <section className="events-page">
        <div className="page-header-block">
          <div>
            <p className="eyebrow">My schedule</p>
            <h2>My Events</h2>
          </div>
          <p className="section-subtitle">Events you've registered for.</p>
        </div>

        {registeredEvents.length === 0 ? (
          emptyState
        ) : (
          <>
            <div className="my-events-section">
              <h3>Upcoming</h3>
              <div className="event-grid">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
                ) : (
                  <div className="empty-state-card small-empty">
                    <p>No upcoming registrations.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="my-events-section">
              <h3>Past</h3>
              <div className="event-grid">
                {pastEvents.length > 0 ? (
                  pastEvents.map((event) => <EventCard key={event.id} event={event} />)
                ) : (
                  <div className="empty-state-card small-empty">
                    <p>No past events yet.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default MyEvents;
