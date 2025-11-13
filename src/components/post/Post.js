import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Post.css";

function Post(msg) {
  if (!msg) return null;    
  return (
    <div key={msg._id} className="post">
      <div className="post-header">
        {msg.author?.avatar && (
          <img
            src={msg.author.avatar}
            alt={msg.author.username}
            className="post-avatar"
          />
        )}
        <div>
          <strong>{msg.author?.username}</strong>{" "}
          <span className="post-date">
            {new Date(msg.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="post-content">
        <Markdown remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
      </div>
    </div>
  );
}

export default Post;
