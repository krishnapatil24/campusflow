import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <article className="event-card-item">
      <img src={event.image} alt={event.title} className="event-card-image" />

      <div className="event-card-body">
        <div className="event-card-top">
          <span className="event-category-badge">{event.category}</span>
        </div>

        <h3>{event.title}</h3>
        <p className="event-description">{event.description}</p>

        <div className="event-meta-list">
          <span>{new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>{event.time}</span>
          <span>{event.location}</span>
        </div>

        <div className="event-footer-row">
          <span>{event.registeredCount} participants</span>
          <button type="button" className="primary-btn event-card-button" onClick={() => navigate(`/events/${event.id}`)}>
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
