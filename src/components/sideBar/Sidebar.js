import { useState } from "react";
import Title from "../title/Title";
import "./Sidebar.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  const menuItems = [
    { href: "/phorum", icon: "💬", label: "Phorum" },
    { href: "/polls", icon: "📊", label: "Polls" },
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

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="profile-icon"></div>

        <nav className="menu">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={(e) => handleMouseEnter(e, item.label)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </a>
          ))}
        </nav>

        <button className="toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "⬅️"}
        </button>
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
