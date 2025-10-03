import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TopicPage.css";

function TopicPage() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/topics/${id}`)
      .then((res) => res.json())
      .then((data) => setTopic(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!topic) return <p className="loading">Loading...</p>;

  return (
    <div className="topic-page">
      <h1 className="topic-title">{topic.title}</h1>
      <p className="topic-description">{topic.description}</p>

      <div className="topic-meta">
        <span>
          <strong>Created:</strong>{" "}
          {new Date(topic.creationDate).toLocaleString()}
        </span>
        <span>
          <strong>Creator:</strong> {topic.creator?.username}
        </span>
        <span>
          <strong>Posts:</strong> {topic.nbrPosts}
        </span>
        <span>
          <strong>Participants:</strong> {topic.nbrPosters}
        </span>
      </div>

      {topic.participants && topic.participants.length > 0 && (
        <div className="topic-participants">
          <h3>Participants</h3>
          <ul>
            {topic.participants.map((user) => (
              <li key={user._id}>
                <img
                  src={user.avatar}
                  alt={user.username}
                  width="30"
                  height="30"
                />
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.tags && topic.tags.length > 0 && (
        <div className="topic-tags">
          <h3>Tags</h3>
          <ul>
            {topic.tags.map((tag, idx) => (
              <li key={idx}>#{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TopicPage;
