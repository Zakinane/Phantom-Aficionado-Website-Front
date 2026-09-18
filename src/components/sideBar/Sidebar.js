import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [tooltip, setTooltip] = useState(null);

  const menuItems = [
    {
      href: "/phorum",
      icon: "💬",
      label: "PHORUM",
      description: "Talk about the latest news !!",
    },
    {
      href: "/poll",
      icon: "📊",
      label: "POLL",
      description: "Vote on the latest poll !!",
    },
    {
      href: "/im",
      icon: "✉️",
      label: "IM",
      description: "Chat with your teammates !",
    },
    {
      href: "/notifications",
      icon: "🔔",
      label: "Notifications",
      // badge: 3,
      description: "Check your notifications !",
    },
    {
      href: "/support",
      icon: "❤",
      label: "Support",
      description: "Get help and support !",
    },
  ];

  const handleMouseEnter = (e, item) => {
    if (!collapsed) return;

    setTooltip({
      text: item.label,
      description: item.description,
      x: e.clientX + 15,
      y: e.clientY + 15,
    });
  };

  const handleMouseMove = (e) => {
    if (!tooltip) return;

    setTooltip((prev) => ({
      ...prev,
      x: e.clientX + 15,
      y: e.clientY + 15,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="halftone"></div>

        {/* =========================
            PHORUM BRAND  
        ========================= */}

        <div className="sidebar-brand" onClick={() => navigate("/phorum")}>
          <div className="brand-title">
            P<span>H</span>ORUM
          </div>

          {!collapsed && (
            <div className="brand-subtitle">Discuss everything about the thieves!</div>
          )}
        </div>


        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="menu">
          {menuItems.map((item) => {
            const active = isActive(item.href);

            return (
              <button
                key={item.label}
                className={`menu-item ${active ? "active" : ""}`}
                onClick={() => navigate(item.href)}
                onMouseEnter={(e) => handleMouseEnter(e, item)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* ICON */}

                <span className="menu-icon">{item.icon}</span>

                {/* LABEL */}

                {!collapsed && <span className="menu-label">{item.label}</span>}

                {/* NOTIFICATION */}

                {!collapsed && item.badge && (
                  <span className="notification-badge">{item.badge}</span>
                )}

                {/* COLLAPSED BADGE */}

                {collapsed && item.badge && (
                  <span className="collapsed-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* =========================
            COLLAPSE
        ========================= */}

        <button
          className="collapse-button"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <span className="collapse-arrow">→</span>
          ) : (
            <>
              <span className="collapse-arrow">←</span>

              <span>Collapse sidebar</span>
            </>
          )}
        </button>

        {/* =========================
            LOGOUT
        ========================= */}

        {!collapsed && (
          <button className="disconnect-btn" onClick={handleDisconnect}>
            <span className="logout-icon">↪</span>

            <span>Log out</span>
          </button>
        )}
      </aside>

      {/* =========================
          TOOLTIP
      ========================= */}

      {tooltip && (
        <div
          className="tooltip"
          style={{
            top: tooltip.y - 20,
            left: tooltip.x + 20,
          }}
        >
          <div className="tooltip-title">{tooltip.text}</div>

          <p className="tooltip-desc">{tooltip.description}</p>
        </div>
      )}
    </>
  );
}

export default Sidebar;
