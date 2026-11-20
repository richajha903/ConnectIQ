import { useState } from "react";

// Toggles between "Follow" and "Following"
// size: daisyUI button size class e.g. "btn-xs", "btn-sm" or "" for normal
export default function FollowButton({ size = "btn-sm", className = "" }) {
  const [following, setFollowing] = useState(false);

  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`btn ${size} follow-button ${following ? "btn-outline" : "btn-primary"} ${className}`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
