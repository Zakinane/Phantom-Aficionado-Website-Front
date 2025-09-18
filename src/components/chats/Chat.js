import "./Chat.css";

function Chat({ chatRoom, username, content, isNew, nbrPosts }) {
  return (
    <a href={chatRoom} className="message">
      {isNew && <span className="badge">NEW</span>}
      <div className="username">{username}</div>
      <div>
        <div className="content">
          {content.length > 205 ? content.slice(0, 202) + "..." : content}
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
