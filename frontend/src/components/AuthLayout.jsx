import Logo from "./Logo";
import Footer from "./Footer";

const highlights = [
  { emoji: "📸", title: "Share moments", text: "Post photos and captions with your friends." },
  { emoji: "⚡", title: "Real-time chat", text: "Instant one-to-one messaging with Socket.IO." },
  { emoji: "✨", title: "AI-powered", text: "Smart captions, replies and chat summaries." },
];

// Split-screen layout shared by Login and Signup pages
export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      {/* Left: brand panel (desktop only) */}
      <div className="auth-brand-panel">
        <div className="auth-decor-circle-top" />
        <div className="auth-decor-circle-bottom" />

        <Logo light size={44} />

        <div className="auth-brand-content">
          <h1 className="auth-headline">
            Smarter Ways <br /> to Connect.
          </h1>
          <p className="auth-tagline">Share your moments, chat in real time and let AI help you say it better.</p>

          <div className="auth-highlight-list">
            {highlights.map((h) => (
              <div key={h.title} className="auth-highlight-item">
                <span className="auth-highlight-emoji">{h.emoji}</span>
                <div>
                  <p className="auth-highlight-title">{h.title}</p>
                  <p className="auth-highlight-text">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right: form */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <div className="auth-mobile-logo">
            <Logo size={44} />
          </div>
          <div className="card auth-card">
            <div className="card-body auth-card-body">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
