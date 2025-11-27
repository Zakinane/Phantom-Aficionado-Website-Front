import { useEffect, useState } from "react";
import Topic from "./Topic";
import "./Topics.css";

function Topics({ refreshTrigger, search }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopics = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URI}/topics`)
      .then((res) => {
        if (!res.ok) throw new Error("Error while fetching topics");
        return res.json();
      })
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTopics();
  }, [refreshTrigger]);

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(search.toLowerCase()))
  );

  const topicsToDisplay =
    search.trim() === "" ? topics : filteredTopics;

  if (loading)
    return <div className="loading-message">Loading the topics...</div>;

  if (error) return <div className="error-message">Error : {error}</div>;

  return (
    <div className="topics">
      {topicsToDisplay.length === 0 && (
        <div style={{ color: "white" }}>
          No matching topics...
        </div>
      )}

      {topicsToDisplay
        .slice()
        .reverse()
        .map((topic) => (
          <Topic
            key={topic._id}
            topicRoomURL={`/topic/${topic._id}`}
            title={topic.title}
            content={topic.description || "No description"}
            isNew={
              new Date(topic.lastActivity) >
              new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
            nbrPosts={topic.posts.length + 1}
          />
        ))}
    </div>
  );
}

export default Topics;
