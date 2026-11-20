import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";
import FollowButton from "../components/FollowButton";
import { currentUser, users, posts, gridImages } from "../data/dummyData";

export default function Profile() {
  const { username } = useParams();
  const [tab, setTab] = useState("posts");

  // No username in the URL = my own profile
  const user = username ? users.find((u) => u.username === username) || currentUser : currentUser;
  const isMe = user.id === currentUser.id;

  const userPosts = [...posts.filter((p) => p.user.id === user.id).map((p) => p.image), ...gridImages.slice(0, 5)];

  const stats = [
    { label: "Posts", value: userPosts.length },
    { label: "Followers", value: user.followers },
    { label: "Following", value: user.following },
  ];

  return (
    <div className="profile-page">
      {/* ---------- Profile header ---------- */}
      <div className="card profile-card">
        <div className="profile-cover" />
        <div className="profile-card-body">
          <div className="profile-header-row">
            <div className="avatar">
              <div className="profile-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
            </div>
            <div className="profile-identity">
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-handle">@{user.username}</p>
            </div>

            <div className="profile-actions">
              {isMe ? (
                <button
                  onClick={() => document.getElementById("edit_profile_modal").showModal()}
                  className="btn btn-outline btn-primary profile-action-button"
                >
                  <Icon name="pencil" className="icon-xs" /> Edit Profile
                </button>
              ) : (
                <>
                  <FollowButton size="" className="profile-action-button" />
                  <Link to="/chat" className="btn btn-outline profile-action-button">
                    <Icon name="chat" className="icon-sm" /> Message
                  </Link>
                </>
              )}
            </div>
          </div>

          <p className="profile-bio">{user.bio}</p>

          {/* Stats */}
          <div className="profile-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="profile-stat-value">{s.value.toLocaleString()}</p>
                <p className="profile-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Tabs ---------- */}
      <div role="tablist" className="tabs tabs-border profile-tabs">
        <button
          role="tab"
          className={`tab profile-tab ${tab === "posts" ? "tab-active profile-tab-active" : ""}`}
          onClick={() => setTab("posts")}
        >
          <Icon name="photo" className="icon-sm" /> Posts
        </button>
        <button
          role="tab"
          className={`tab profile-tab ${tab === "saved" ? "tab-active profile-tab-active" : ""}`}
          onClick={() => setTab("saved")}
        >
          <Icon name="bookmark" className="icon-sm" /> Saved
        </button>
      </div>

      {/* ---------- Posts grid ---------- */}
      {tab === "posts" ? (
        <div className="profile-post-grid">
          {userPosts.map((img, i) => (
            <div key={i} className="profile-post">
              <img src={img} alt="post" className="profile-post-image" />
              <div className="profile-post-overlay">
                <span className="overlay-stat"><Icon name="heart" filled className="icon-sm" /> {120 + i * 37}</span>
                <span className="overlay-stat"><Icon name="chat" filled className="icon-sm" /> {4 + i}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="saved-empty">
          <Icon name="bookmark" className="icon-xl saved-empty-icon" />
          <p>Saved posts will appear here</p>
        </div>
      )}

      {/* ---------- Edit profile modal ---------- */}
      <dialog id="edit_profile_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="modal-title">Edit Profile</h3>
          <div className="edit-avatar-row">
            <Avatar src={currentUser.avatar} size="lg" ring />
            <label className="btn btn-sm btn-soft btn-primary">
              Change photo
              <input type="file" accept="image/*" className="hidden-file-input" />
            </label>
          </div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input className="input edit-profile-input" defaultValue={currentUser.name} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Bio</legend>
            <textarea className="textarea edit-profile-input" defaultValue={currentUser.bio} />
          </fieldset>
          <div className="modal-action">
            <form method="dialog" className="modal-footer-buttons">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
