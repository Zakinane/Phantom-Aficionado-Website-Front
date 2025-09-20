import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../title/Title";
import "./Sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
  const [tooltip, setTooltip] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { href: "/phorum", icon: "💬", label: "PHORUM" },
    { href: "/poll", icon: "📊", label: "POLL" },
    { href: "/im", icon: "✉️", label: "IM" },
    { href: "/notifications", icon: "🔔", label: "Notifications" },
    { href: "/support", icon: "❤", label: "Support" },
  ];

  const handleMouseEnter = (e, text) => {
    setTooltip({
      text,
      x: e.clientX + 15,
      y: e.clientY + 15,
    });
  };

  const handleMouseMove = (e) => {
    if (tooltip) {
      setTooltip((prev) => ({
        ...prev,
        x: e.clientX + 15,
        y: e.clientY + 15,
      }));
    }
  };

  const handleMouseLeave = () => setTooltip(null);

  const handleDisconnect = () => {
    localStorage.removeItem("token"); // supprimer le token
    navigate("/");
  };

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="profile-icon"></div>

        <nav className="menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.href)}
              onMouseEnter={(e) => handleMouseEnter(e, item.label)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <button className="toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "⬅️"}
        </button>
        {!collapsed && (
          <button className="disconnect-btn" onClick={handleDisconnect}>
            Disconnect
          </button>
        )}
      </aside>

      {tooltip && (
        <div
          className="tooltip"
          style={{
            top: tooltip.y,
            left: tooltip.x,
          }}
        >
          <Title title={tooltip.text} redIndex={1} />
        </div>
      )}
    </>
  );
}

export default Sidebar;
