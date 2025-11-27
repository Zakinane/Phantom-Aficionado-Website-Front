import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Prompt from "../../components/prompt/Prompt";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./TopicPage.css";

function TopicPage() {
  const { user } = useUser();
  const { id } = useParams();

  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URI}/topics/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTopic(data);
        if (data.posts) setPosts(data.posts);
      })
      .catch((err) => console.error(err));
  }, [id]);

  async function closeTopic() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.REACT_APP_API_URI}/topics/${id}/close`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Error closing topic");
        return;
      }

      setShowPrompt(false);
      setTopic((prev) => ({ ...prev, isClosed: true }));
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  async function addPost(e) {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.REACT_APP_API_URI}/topics/${id}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newPost }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Error sending post");
        return;
      }

      setPosts((prev) => [...prev, data]);
      setNewPost("");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  if (!topic) return <p className="loading">Loading...</p>;

  return (
    <div className="topic-page">
      <h1 className="topic-title">{topic.title}</h1>
      <div className="topic-description">
        <Markdown remarkPlugins={[remarkGfm]}>{topic.description}</Markdown>
      </div>  

      <div className="topic-meta">
        <span>
          <strong>Created on:</strong>{" "}
          {new Date(topic.creationDate).toLocaleString()}
        </span>
        <span>
          <strong>Creator:</strong> {topic.creator?.username}
        </span>
        <span>
          <strong>Posts:</strong> {posts.length + 1}
        </span>
        <span>
          <strong>Participants:</strong> {topic.nbrPosters}
        </span>
      </div>

      <div className="topic-meta2">
        {topic.participants?.length > 0 && (
          <div className="topic-participants">
            <h3>Participants</h3>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              {topic.participants.map((user) => (
                <div key={user._id} className="participant">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    width="30"
                    height="30"
                  />
                  {user.username}
                </div>
              ))}
            </div>
            {topic.isClosed && (
              <div>
                <b>Topic closed since</b>{" "}
                {new Date(topic.closedAt).toLocaleString()}
              </div>
            )}
          </div>
        )}

        {topic.tags?.length > 0 && (
          <div className="topic-tags">
            <h3>Tags</h3>
            <div>
              {topic.tags.map((tag, idx) => (
                <div key={idx}>{tag}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!topic.isClosed && (
        <form className="post-form" onSubmit={addPost}>
          <textarea
            id="textarea-post"
            placeholder="Write your response..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button id="respond-button" type="submit">
            Respond
          </button>
        </form>
      )}

      <div className="topic-posts">
        <h3>Posts</h3>
        <div className="topic-posts-container">
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet.</p>
          ) : (
            posts.map(
              (msg) =>
                msg.createdAt && (
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
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </Markdown>
                    </div>
                  </div>
                ) // A REGLER URGENT
            )
          )}
        </div>
      </div>

      {user?._id === topic.creator?._id && !topic.isClosed && (
        <button onClick={() => setShowPrompt(true)}>Close topic</button>
      )}

      {showPrompt && (
        <Prompt
          title="Close this topic?"
          description="This action is irreversible."
          buttons={[
            <button
              key="cancel"
              className="btn btn-cancel"
              onClick={() => setShowPrompt(false)}
            >
              Cancel
            </button>,
            <button
              key="confirm"
              className="btn btn-danger"
              onClick={closeTopic}
            >
              Confirm
            </button>,
          ]}
        />
      )}
    </div>
  );
}

export default TopicPage;
