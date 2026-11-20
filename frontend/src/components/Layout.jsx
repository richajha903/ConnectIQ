import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Icon from "./Icon";
import Avatar from "./Avatar";
import CreatePostModal from "./CreatePostModal";
import Footer from "./Footer";
import { currentUser } from "../data/dummyData";

const links = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/explore", label: "Explore", icon: "search" },
  { to: "/chat", label: "Messages", icon: "chat" },
  { to: "/profile", label: "Profile", icon: "user" },
];

// Opens the daisyUI <dialog> with id="create_post_modal"
const openCreatePost = () => document.getElementById("create_post_modal").showModal();

// Class helpers for active links
const sidebarLinkClass = ({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`;
const dockLinkClass = ({ isActive }) => (isActive ? "dock-active dock-link-active" : "");

export default function Layout() {
  // Chat page fills the whole screen, so we hide the footer there
  const { pathname } = useLocation();
  const showFooter = pathname !== "/chat";

  return (
    <div className="app-shell">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="sidebar">
        <Link to="/" className="sidebar-logo">
          <Logo />
        </Link>

        <ul className="menu sidebar-menu">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end className={sidebarLinkClass}>
                <Icon name={link.icon} />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button onClick={openCreatePost} className="btn btn-primary sidebar-create-button">
          <Icon name="plus" className="icon-sm" /> Create Post
        </button>

        {/* Logged-in user card */}
        <div className="sidebar-user-card">
          <Avatar src={currentUser.avatar} />
          <div className="sidebar-user-info">
            <p className="user-name">{currentUser.name}</p>
            <p className="user-handle">@{currentUser.username}</p>
          </div>
          <Link to="/login" className="btn btn-ghost btn-sm btn-circle" title="Logout">
            <Icon name="logout" className="icon-sm" />
          </Link>
        </div>
      </aside>

      {/* ---------- Mobile top bar ---------- */}
      <header className="navbar mobile-topbar">
        <div className="mobile-topbar-logo">
          <Logo size={32} />
        </div>
        <Link to="/chat" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Icon name="chat" />
            <span className="badge badge-secondary badge-xs indicator-item">3</span>
          </div>
        </Link>
      </header>

      {/* ---------- Page content ---------- */}
      <main className="main-content">
        <Outlet />
        {showFooter && <Footer />}
      </main>

      {/* ---------- Mobile bottom dock ---------- */}
      <nav className="dock mobile-dock">
        <NavLink to="/" end className={dockLinkClass}>
          <Icon name="home" />
        </NavLink>
        <NavLink to="/explore" className={dockLinkClass}>
          <Icon name="search" />
        </NavLink>
        <button onClick={openCreatePost}>
          <span className="dock-create-button">
            <Icon name="plus" />
          </span>
        </button>
        <NavLink to="/chat" className={dockLinkClass}>
          <Icon name="chat" />
        </NavLink>
        <NavLink to="/profile" end className={dockLinkClass}>
          <Icon name="user" />
        </NavLink>
      </nav>

      <CreatePostModal />
    </div>
  );
}
