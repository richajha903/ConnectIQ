import { useState } from "react";
import Icon from "./Icon";
import Avatar from "./Avatar";
import { currentUser, aiCaptions } from "../data/dummyData";

const tones = ["Funny", "Casual", "Professional"];

export default function CreatePostModal() {
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  // AI Caption Generator state
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Casual");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Fake AI call — later this will call our backend, which calls the Groq API
  const generateCaptions = () => {
    setLoading(true);
    setTimeout(() => {
      setSuggestions(aiCaptions[tone]);
      setLoading(false);
    }, 1000);
  };

  return (
    <dialog id="create_post_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box create-post-box">
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">Create New Post</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>

        <div className="create-post-content">
          {/* Image upload */}
          <label className="image-upload-area">
            {preview ? (
              <img src={preview} alt="preview" className="image-preview" />
            ) : (
              <>
                <Icon name="photo" className="icon-xl image-upload-icon" />
                <span className="image-upload-title">Tap to upload a photo</span>
                <span className="image-upload-hint">PNG, JPG up to 5MB</span>
              </>
            )}
            <input type="file" accept="image/*" className="hidden-file-input" onChange={handleImage} />
          </label>

          {/* Caption */}
          <div className="caption-section">
            <div className="caption-author">
              <Avatar src={currentUser.avatar} size="xs" />
              <span className="user-name">{currentUser.username}</span>
            </div>
            <textarea
              className="textarea caption-input"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            {/* AI Caption Generator */}
            <div className="ai-caption-panel">
              <p className="ai-label">
                <Icon name="sparkles" className="icon-sm" /> AI Caption Generator
              </p>
              <input
                className="input input-sm keyword-input"
                placeholder="Keywords e.g. trek, sunrise, friends"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <div className="join tone-switcher">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`btn btn-xs join-item tone-button ${tone === t ? "btn-primary" : ""}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button onClick={generateCaptions} className="btn btn-sm btn-secondary generate-button" disabled={loading}>
                {loading ? <span className="loading loading-dots loading-sm" /> : "✨ Generate Captions"}
              </button>

              {suggestions.length > 0 && (
                <ul className="caption-suggestion-list">
                  {suggestions.map((s) => (
                    <li key={s} className="caption-suggestion">
                      <span className="caption-suggestion-text">{s}</span>
                      <button onClick={() => setCaption(s)} className="btn btn-xs btn-primary btn-soft">
                        Use
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <form method="dialog" className="modal-footer-buttons">
            <button className="btn btn-ghost">Cancel</button>
            <button className="btn btn-primary share-button">Share</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
