// Reusable round avatar.
// size: "xs" | "sm" | "md" | "lg"   online: shows green dot   ring: blue ring around it
export default function Avatar({ src, size = "sm", online = false, ring = false }) {
  return (
    <div className={`avatar ${online ? "avatar-online" : ""}`}>
      <div className={`avatar-image avatar-${size} ${ring ? "avatar-ring" : ""}`}>
        <img src={src} alt="avatar" />
      </div>
    </div>
  );
}
