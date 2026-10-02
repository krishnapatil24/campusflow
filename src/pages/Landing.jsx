import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Landing() {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR CAMPUS. ONE FLOW.</p>

          <h1>
            Everything happening
            <br />
            <span>on your campus.</span>
          </h1>

          <p className="hero-description">
            Discover events, stay updated, report campus issues,
            and manage your student life — all from one place.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">
              Get Started →
            </Link>

            <Link to="/events" className="secondary-btn">
              Explore Events
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="mock-header">
            <span>CampusFlow</span>
            <span>●</span>
          </div>

          <div className="mock-greeting">
            <p>Good morning, Krish</p>
            <h3>Here's what's happening.</h3>
          </div>

          <div className="mock-stats">
            <div>
              <strong>12</strong>
              <span>Events</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Registered</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Issues</span>
            </div>
          </div>

          <div className="mock-event">
            <div>
              <small>UPCOMING EVENT</small>
              <h3>Campus Hackathon 2026</h3>
              <p>12 Oct • Main Auditorium</p>
            </div>

            <span>→</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <p className="eyebrow">BUILT FOR STUDENTS</p>
          <h2>One place for campus life.</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">01</div>
            <h3>Discover</h3>
            <p>
              Find hackathons, workshops, cultural events and
              activities happening around campus.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">02</div>
            <h3>Connect</h3>
            <p>
              Register for events and stay updated with important
              campus announcements.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">03</div>
            <h3>Resolve</h3>
            <p>
              Report campus problems and track them from submission
              to resolution.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Landing;