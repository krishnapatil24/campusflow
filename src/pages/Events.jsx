import { useMemo, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import EventCard from "../components/EventCard";
import { events } from "../data/events";

const categoryOptions = ["All", "Technical", "Cultural", "Sports", "Workshop"];

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory = activeCategory === "All" || event.category === activeCategory;
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <DashboardLayout>
      <section className="events-page">
        <div className="page-header-block">
          <div>
            <p className="eyebrow">Campus</p>
            <h2>Discover Campus Events</h2>
          </div>
          <p className="section-subtitle">Find something interesting happening around campus.</p>
        </div>

        <div className="events-toolbar">
          <label className="search-field" aria-label="Search events">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search events..."
            />
          </label>

          <div className="category-filters">
            {categoryOptions.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-chip ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="empty-state-card">
            <h3>No events found</h3>
            <p>Try a different keyword or switch categories.</p>
          </div>
        ) : (
          <div className="event-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default Events;
