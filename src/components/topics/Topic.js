import "./Topic.css";

function Topic({ topicRoomURL, title, content, isNew, nbrPosts }) {
  return (
    <a href={topicRoomURL} className="topic">
      {isNew && <span className="badge">NEW</span>}
      <div className="title-topic">{title}</div>
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

export default Topic;
