import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../title/Title";
import { useUser } from "../../context/UserContext";
import "./Sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
  const { user } = useUser();
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

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div>
          <div className="profile-icon">
            <img src={user?.avatar} alt="pfp" />
          </div>
          {user && !collapsed && (
            <p>
              Hello <b>{user.username}</b> !
            </p>
          )}
        </div>

        <nav className="menu">
          {menuItems.map((item) => (
            <button
              style={{ width: "100%" }}
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
          className={`tooltip visible`}
          style={{
            top: tooltip.y - 20,
            left: tooltip.x + 20,
          }}
        >
          <Title title={tooltip.text} redIndex={1} />
          <p className="tooltip-desc">
            {{
              PHORUM: "Talk about the latest new !!",
              POLL: "Vote on latest poll !!",
              IM: "Chat with your teamates !",
            }[tooltip.text] || `Click to go to ${tooltip.text}`}
          </p>
        </div>
      )}
    </>
  );
}

export default Sidebar;
