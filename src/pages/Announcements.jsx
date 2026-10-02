import { useMemo, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";
import { announcements as announcementData } from "../data/announcements";

const categories = ["All", "Academic", "Events", "Clubs", "General"];

function Announcements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredAnnouncements = useMemo(() => {
    return announcementData.filter((announcement) => {
      const matchesCategory = activeCategory === "All" || announcement.category === activeCategory;
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        announcement.title.toLowerCase().includes(query) ||
        announcement.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <DashboardLayout>
      <section className="announcements-page">
        <div className="page-header-block">
          <div>
            <p className="eyebrow">Updates</p>
            <h2>Announcements</h2>
          </div>
          <p className="section-subtitle">Stay updated with what's happening around campus.</p>
        </div>

        <div className="events-toolbar">
          <label className="search-field" aria-label="Search announcements">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search announcements..."
            />
          </label>

          <div className="category-filters">
            {categories.map((category) => (
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

        {filteredAnnouncements.length === 0 ? (
          <div className="empty-state-card">
            <h3>No announcements found</h3>
            <p>Try another search term or category.</p>
          </div>
        ) : (
          <div className="announcement-feed">
            {filteredAnnouncements.map((announcement) => (
              <article key={announcement.id} className="announcement-item">
                <div className="announcement-head">
                  <span className="announcement-category">{announcement.category}</span>
                  {announcement.important && <span className="important-badge">Important</span>}
                </div>

                <h3>{announcement.title}</h3>
                <p>{announcement.description}</p>
                <small>{announcement.date}</small>
              </article>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default Announcements;
