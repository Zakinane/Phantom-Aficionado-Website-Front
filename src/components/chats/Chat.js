import "./Chat.css";

function Chat({ chatRoom, username, content, isNew, nbrPosts }) {
  return (
    <a href={chatRoom} className="message">
      <div className="username">{username}</div>
      <div className={isNew ? "NEW content" : "content"}>{content}</div>
      <div className="nbr-posts">
        {nbrPosts}
        <br />
        posts
      </div>
    </a>
  );
}

export default Chat;
