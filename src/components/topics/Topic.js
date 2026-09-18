import "./Topic.css";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Topic({
  topicRoomURL,
  title,
  content,
  isNew,
  nbrPosts,
  author,
  createdAt,
  avatar,
  category = "General",
  views = 0,
}) {
  const username = author?.username || author || "Unknown";

  const userAvatar = avatar || author?.avatar || null;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <Link to={topicRoomURL} className={`topic ${isNew ? "topic-new" : ""}`}>
      {/* =================================
          AVATAR
      ================================= */}

      <div className="topic-avatar-container">
        {userAvatar ? (
          <img src={userAvatar} alt={username} className="topic-avatar" />
        ) : (
          <div className="topic-avatar-placeholder">?</div>
        )}
      </div>

      {/* =================================
          MAIN CONTENT
      ================================= */}

      <div className="topic-main">
        <div className="topic-title-row">
          <h3 className="title-topic">{title}</h3>

          {isNew && <span className="badge">NEW</span>}
        </div>

        <div className="topic-description">
          <span className="topic-tag">{category}</span>

          <div className="content">
            <Markdown remarkPlugins={[remarkGfm]}>
              {content?.length > 150 ? content.slice(0, 150) + "..." : content}
            </Markdown>
          </div>
        </div>

        {/* USER + DATE */}

        <div className="topic-author">
          <span className="author-name">{username}</span>

          <span className="author-separator">•</span>

          <span>{formattedDate}</span>
        </div>
      </div>

      {/* =================================
          STATS
      ================================= */}

      <div className="topic-stats">
        <div className="topic-stat">
          <span className="stat-icon">♡</span>0
        </div>

        <div className="topic-stat">
          <span className="stat-icon">🗨</span>
          <span>{nbrPosts + 1 || 1}</span>
        </div>
      </div>
    </Link>
  );
}

export default Topic;
