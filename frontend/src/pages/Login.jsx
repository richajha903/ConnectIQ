import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const navigate = useNavigate();

  // Static for now — later we will send email/password to POST /api/auth/login
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <AuthLayout>
      <h2 className="auth-title">Welcome back 👋</h2>
      <p className="auth-subtitle">Log in to continue to ConnectIQ</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" className="input auth-input" placeholder="you@example.com" required />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input type="password" className="input auth-input" placeholder="••••••••" required />
        </fieldset>

        <div className="auth-options-row">
          <label className="remember-me">
            <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
            Remember me
          </label>
          <a className="link link-primary link-hover">Forgot password?</a>
        </div>

        <button className="btn btn-primary auth-submit-button">Log In</button>
      </form>

      <p className="auth-switch-text">
        New to ConnectIQ?{" "}
        <Link to="/signup" className="link link-primary auth-switch-link">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
