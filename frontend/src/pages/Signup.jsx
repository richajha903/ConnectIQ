import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const navigate = useNavigate();

  // Static for now — later we will send this data to POST /api/auth/register
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <AuthLayout>
      <h2 className="auth-title">Create account 🚀</h2>
      <p className="auth-subtitle">Join ConnectIQ and start connecting</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-name-row">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Full name</legend>
            <input className="input auth-input" placeholder="Mentor" required />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Username</legend>
            <input className="input auth-input" placeholder="mentor" required />
          </fieldset>
        </div>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" className="input auth-input" placeholder="you@example.com" required />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input type="password" className="input auth-input" placeholder="At least 6 characters" required />
        </fieldset>

        <button className="btn btn-primary auth-submit-button">Sign Up</button>
      </form>

      <p className="auth-switch-text">
        Already have an account?{" "}
        <Link to="/login" className="link link-primary auth-switch-link">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
