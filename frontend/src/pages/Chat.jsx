import { useState } from "react";
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";
import { conversations, currentUser, aiReplies, aiSummary } from "../data/dummyData";

const tones = ["Friendly", "Funny", "Professional"];

export default function Chat() {
  const [chats, setChats] = useState(conversations);
  const [activeId, setActiveId] = useState(null);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  // AI state
  const [tone, setTone] = useState("Friendly");
  const [replies, setReplies] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loadingAI, setLoadingAI] = useState("");

  const activeChat = chats.find((c) => c.id === activeId);
  const filteredChats = chats.filter((c) => c.user.name.toLowerCase().includes(search.toLowerCase()));

  const openChat = (id) => {
    setActiveId(id);
    setReplies([]);
    setSummary([]);
    // Mark as read
    setChats(chats.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  // Static send — later this will emit a Socket.IO "sendMessage" event
  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const msg = { id: Date.now(), from: "me", text, time };
    setChats(chats.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, msg], time } : c)));
    setText("");
    setReplies([]);
  };

  // Fake AI calls — later these will hit our backend, which calls the Groq API
  const suggestReplies = () => {
    setLoadingAI("replies");
    setTimeout(() => {
      setReplies(aiReplies[tone]);
      setLoadingAI("");
    }, 900);
  };

  const summarizeChat = () => {
    setLoadingAI("summary");
    setTimeout(() => {
      setSummary(aiSummary);
      setLoadingAI("");
    }, 1200);
  };

  return (
    <div className="chat-page">
      {/* ---------- Conversation list (on mobile: hidden while a chat is open) ---------- */}
      <aside className={`conversation-panel ${activeChat ? "is-hidden-on-mobile" : ""}`}>
        <div className="conversation-panel-header">
          <h1 className="page-title">Messages</h1>
          <label className="input chat-search">
            <Icon name="search" className="icon-xs search-icon" />
            <input placeholder="Search chats" value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
        </div>

        <ul className="conversation-list">
          {filteredChats.map((c) => {
            const last = c.messages[c.messages.length - 1];
            return (
              <li key={c.id}>
                <button
                  onClick={() => openChat(c.id)}
                  className={`conversation-item ${c.id === activeId ? "is-active" : ""}`}
                >
                  <Avatar src={c.user.avatar} size="md" online={c.user.online} />
                  <div className="conversation-info">
                    <div className="conversation-top-row">
                      <p className="user-name">{c.user.name}</p>
                      <span className="conversation-time">{c.time}</span>
                    </div>
                    <div className="conversation-bottom-row">
                      <p className={`last-message ${c.unread ? "is-unread" : ""}`}>
                        {last.from === "me" && "You: "}
                        {last.text}
                      </p>
                      {c.unread > 0 && <span className="badge badge-secondary badge-sm">{c.unread}</span>}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* ---------- Chat window ---------- */}
      {activeChat ? (
        <section className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <button onClick={() => setActiveId(null)} className="btn btn-ghost btn-sm btn-circle chat-back-button">
              <Icon name="back" className="icon-sm" />
            </button>
            <Avatar src={activeChat.user.avatar} online={activeChat.user.online} />
            <div className="chat-contact">
              <p className="user-name">{activeChat.user.name}</p>
              <p className={`contact-status ${activeChat.user.online ? "is-online" : ""}`}>
                {activeChat.user.online ? "● Online" : "Offline"}
              </p>
            </div>
            <button
              onClick={summarizeChat}
              className="btn btn-sm btn-soft btn-primary summarize-button"
              disabled={loadingAI === "summary"}
            >
              {loadingAI === "summary" ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <Icon name="sparkles" className="icon-xs" />
              )}
              <span className="summarize-label">Summarize</span>
            </button>
          </div>

          {/* Messages */}
          <div className="message-list">
            {/* AI Summary card */}
            {summary.length > 0 && (
              <div className="ai-summary-card">
                <div className="ai-summary-header">
                  <p className="ai-label">
                    <Icon name="sparkles" className="icon-sm" /> AI Chat Summary
                  </p>
                  <button onClick={() => setSummary([])} className="btn btn-ghost btn-xs btn-circle">✕</button>
                </div>
                <ul className="ai-summary-list">
                  {summary.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeChat.messages.map((m) => (
              <div key={m.id} className={`chat ${m.from === "me" ? "chat-end" : "chat-start"}`}>
                <div className="chat-image">
                  <Avatar src={m.from === "me" ? currentUser.avatar : activeChat.user.avatar} size="xs" />
                </div>
                <div className={`chat-bubble ${m.from === "me" ? "chat-bubble-primary" : "message-bubble-received"}`}>
                  {m.text}
                </div>
                <div className="chat-footer message-time">{m.time}</div>
              </div>
            ))}
          </div>

          {/* AI Smart Replies */}
          <div className="smart-reply-bar">
            <div className="smart-reply-controls">
              <span className="ai-label">
                <Icon name="sparkles" className="icon-xs" /> Smart Reply
              </span>
              <div className="join">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`btn btn-xs join-item ${tone === t ? "btn-primary" : ""}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button onClick={suggestReplies} className="btn btn-xs btn-secondary" disabled={loadingAI === "replies"}>
                {loadingAI === "replies" ? <span className="loading loading-dots loading-xs" /> : "Suggest"}
              </button>
            </div>

            {replies.length > 0 && (
              <div className="smart-reply-list">
                {replies.map((r) => (
                  <button key={r} onClick={() => setText(r)} className="btn btn-sm btn-outline btn-primary smart-reply-chip">
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="message-form">
            <input
              className="input message-input"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn btn-primary btn-circle" disabled={!text.trim()}>
              <Icon name="send" className="icon-sm" />
            </button>
          </form>
        </section>
      ) : (
        /* Empty state (desktop, when no chat is selected) */
        <section className="chat-empty-state">
          <div className="chat-empty-icon">
            <Icon name="chat" className="icon-xl" />
          </div>
          <h2 className="chat-empty-title">Your messages</h2>
          <p className="helper-text">Select a conversation to start chatting</p>
        </section>
      )}
    </div>
  );
}
