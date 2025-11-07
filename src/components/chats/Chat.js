import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Chat.css";

function Chat({ chatRoomURL, title, content, isNew, nbrPosts }) {
  return (
    <a href={chatRoomURL} className="message">
      {isNew && <span className="badge">NEW</span>}
      <div className="title-chat">{title}</div>
      <div>
        <div className="content">
          <Markdown remarkPlugins={[remarkGfm]}>
            {content.length > 205 ? content.slice(0, 202) + "..." : content}
          </Markdown>
        </div>
        {isNew && <div className="content1"></div>}
      </div>
      <div className="nbr-posts">
        {nbrPosts}
        <br />
        posts
      </div>
    </a>
  );
}

export default Chat;
