import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";
import FollowButton from "../components/FollowButton";
import { users, gridImages } from "../data/dummyData";

export default function Explore() {
  const [search, setSearch] = useState("");

  // Filter users by name or username
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Explore</h1>
      <p className="page-subtitle">Discover people and follow what inspires you</p>

      {/* Search */}
      <label className="input search-bar">
        <Icon name="search" className="icon-sm search-icon" />
        <input
          type="search"
          className="search-input"
          placeholder="Search by name or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      {/* People */}
      <h2 className="section-title">People</h2>
      {filtered.length === 0 ? (
        <div className="empty-state">No users found for "{search}" 🔍</div>
      ) : (
        <div className="people-grid">
          {filtered.map((u) => (
            <div key={u.id} className="card person-card">
              <div className="card-body person-card-body">
                <Link to={`/profile/${u.username}`}>
                  <Avatar src={u.avatar} size="lg" online={u.online} ring />
                </Link>
                <Link to={`/profile/${u.username}`} className="person-name">
                  {u.name}
                </Link>
                <p className="user-handle">@{u.username}</p>
                <p className="person-bio">{u.bio}</p>
                <p className="person-followers">{u.followers.toLocaleString()} followers</p>
                <FollowButton className="person-follow-button" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trending */}
      <h2 className="section-title">Trending posts 🔥</h2>
      <div className="trending-grid">
        {gridImages.map((img) => (
          <img key={img} src={img} alt="trending" className="trending-image" />
        ))}
      </div>
    </div>
  );
}
