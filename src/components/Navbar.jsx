import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Campus<span>Flow</span>
      </Link>

      <div className="nav-links">
        <Link to="/events">Events</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/login" className="nav-login">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;