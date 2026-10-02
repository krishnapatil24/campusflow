import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("campusflow_logged_in", "true");
    navigate("/dashboard");
  };

  const handleDemoLogin = () => {
    localStorage.setItem("campusflow_logged_in", "true");
    navigate("/dashboard");
  };

  return (
    <Layout>
      <section className="auth-page">
        <div className="auth-card">
          <div className="auth-brand" aria-label="CampusFlow brand">
            <div className="brand-mark">CF</div>
            <div className="brand-copy">
              <strong>CampusFlow</strong>
              <small>Student Portal</small>
            </div>
          </div>

          <div className="auth-header">
            <p className="eyebrow">Welcome</p>
            <h2>Welcome back</h2>
            <p className="auth-subtitle">Sign in to continue to your campus.</p>
          </div>

          <form className="stacked-form auth-form" onSubmit={handleLogin}>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                defaultValue="krish@student.campusflow.edu"
                autoComplete="email"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value="••••••••"
                autoComplete="current-password"
                readOnly
              />
            </label>

            <button type="submit" className="primary-btn login-submit">
              Login
            </button>

            <button
              type="button"
              className="secondary-btn auth-demo-button"
              onClick={handleDemoLogin}
            >
              Continue as Demo Student
            </button>
          </form>

          <p className="auth-signup">
            Don&apos;t have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default Login;
