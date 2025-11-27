import "./Topic.css";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Topic({ topicRoomURL, title, content, isNew, nbrPosts }) {
  return (
    <Link to={topicRoomURL} className={`topic`}>
      {isNew && <span className="badge">NEW</span>}
      <div className="title-topic">
        {title.length > 10 ? title.slice(0, 10 - 3) + "..." : title}
      </div>
      <div>
        {isNew && <div className="content-bg"></div>}
        <div className="content">
          <Markdown remarkPlugins={[remarkGfm]}>
            {content.length > 205 ? content.slice(0, 202) + "..." : content}
          </Markdown>
        </div>
      </div>
      <div className="nbr-posts">
        {nbrPosts}
        <br />
        posts
      </div>
    </Link>
  );
}

export default Topic;
