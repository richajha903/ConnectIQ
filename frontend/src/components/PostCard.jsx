import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import Avatar from "./Avatar";
import { currentUser } from "../data/dummyData";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const isMine = post.user.id === currentUser.id;
  const likeCount = post.likes + (liked ? 1 : 0);

  const addComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), user: currentUser, text: newComment }]);
    setNewComment("");
  };

  return (
    <article className="card post-card">
      {/* Header */}
      <div className="post-header">
        <Link to={`/profile/${post.user.username}`}>
          <Avatar src={post.user.avatar} ring />
        </Link>
        <div className="post-author">
          <Link to={`/profile/${post.user.username}`} className="user-name-link">
            {post.user.name}
          </Link>
          <p className="user-handle">@{post.user.username} · {post.time}</p>
        </div>

        {isMine && (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
              <Icon name="more" />
            </button>
            <ul tabIndex={0} className="dropdown-content menu post-menu">
              <li><a><Icon name="pencil" className="icon-xs" /> Edit</a></li>
              <li><a className="post-menu-delete"><Icon name="trash" className="icon-xs" /> Delete</a></li>
            </ul>
          </div>
        )}
      </div>

      {/* Image (double click to like ❤️) */}
      <figure onDoubleClick={() => setLiked(true)} className="post-image-wrapper">
        <img src={post.image} alt="post" className="post-image" />
      </figure>

      <div className="post-body">
        {/* Actions */}
        <div className="post-actions">
          <button onClick={() => setLiked(!liked)} className="btn btn-ghost btn-sm btn-circle">
            <Icon name="heart" filled={liked} className={`icon post-like-icon ${liked ? "is-liked" : ""}`} />
          </button>
          <button className="btn btn-ghost btn-sm btn-circle">
            <Icon name="chat" />
          </button>
          <button className="btn btn-ghost btn-sm btn-circle">
            <Icon name="send" />
          </button>
          <button onClick={() => setSaved(!saved)} className="btn btn-ghost btn-sm btn-circle post-save-button">
            <Icon name="bookmark" filled={saved} className={`icon post-save-icon ${saved ? "is-saved" : ""}`} />
          </button>
        </div>

        <p className="post-stats">
          {likeCount.toLocaleString()} likes · {comments.length} comments
        </p>
        <p className="post-caption">
          <span className="post-username">{post.user.username}</span>
          {post.caption}
        </p>

        {/* Comments */}
        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              <span className="post-username">{c.user.username}</span>
              {c.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Add comment */}
      <form onSubmit={addComment} className="comment-form">
        <input
          className="input input-ghost input-sm comment-input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-link btn-sm comment-submit" disabled={!newComment.trim()}>
          Post
        </button>
      </form>
    </article>
  );
}
