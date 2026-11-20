// ConnectIQ logo: chat bubble + AI sparkle inside a blue square.
// Use light={true} on dark/blue backgrounds.
export default function Logo({ size = 40, showText = true, light = false }) {
  return (
    <div className={`logo ${light ? "logo-light" : ""}`}>
      <img src="/logo.svg" alt="ConnectIQ logo" width={size} height={size} />
      {showText && (
        <span className="logo-text">
          Connect<span className="logo-highlight">IQ</span>
        </span>
      )}
    </div>
  );
}
