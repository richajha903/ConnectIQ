import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";
import FollowButton from "../components/FollowButton";
import { users, posts } from "../data/dummyData";

const openCreatePost = () => document.getElementById("create_post_modal").showModal();

export default function Home() {
  return (
    <div className="home-page">
      {/* ---------- Feed ---------- */}
      <section className="feed">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {/* ---------- Right sidebar (large screens only) ---------- */}
      <aside className="home-sidebar">
        <div className="home-sidebar-sticky">
          {/* AI promo */}
          <div className="card ai-promo-card">
            <div className="card-body">
              <h3 className="card-title">
                <Icon name="sparkles" /> Try AI Captions
              </h3>
              <p className="ai-promo-text">Out of words? Let ConnectIQ AI write a catchy caption for your next post.</p>
              <button onClick={openCreatePost} className="btn btn-sm ai-promo-button">
                Create a post
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="card suggestions-card">
            <div className="card-body suggestions-body">
              <h3 className="suggestions-title">Suggested for you</h3>
              <ul className="suggestion-list">
                {users.slice(0, 4).map((u) => (
                  <li key={u.id} className="suggestion-item">
                    <Link to={`/profile/${u.username}`}>
                      <Avatar src={u.avatar} />
                    </Link>
                    <div className="suggestion-info">
                      <Link to={`/profile/${u.username}`} className="suggestion-name">
                        {u.name}
                      </Link>
                      <p className="user-handle">@{u.username}</p>
                    </div>
                    <FollowButton size="btn-xs" />
                  </li>
                ))}
              </ul>
              <Link to="/explore" className="link link-primary see-all-link">
                See all
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
