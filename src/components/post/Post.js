import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./Post.css";

function Post(msg) {
  if (!msg) return null;

  const avatar = msg.author?.avatar;
  const username = msg.author?.username || "Unknown User";

  const date = msg.createdAt
    ? new Date(msg.createdAt).toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <article className="post">

      {/* USER */}
      <div className="post-user">

        <div className="post-avatar-container">
          {avatar ? (
            <img
              src={avatar}
              alt={username}
              className="post-avatar"
            />
          ) : (
            <div className="post-avatar-placeholder">
              ?
            </div>
          )}
        </div>

        <div className="post-user-info">
          <strong className="post-username">
            {username}
          </strong>

          <span className="post-date">
            {date}
          </span>
        </div>

      </div>


      {/* MESSAGE */}
      <div className="post-content">
        <Markdown remarkPlugins={[remarkGfm]}>
          {msg.content}
        </Markdown>
      </div>

    </article>
  );
}

export default Post;