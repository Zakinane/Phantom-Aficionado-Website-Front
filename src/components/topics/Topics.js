import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

import Topic from "./Topic";
import "./Topics.css";

function Topics({ refreshTrigger, search, filter = "all", sort = "latest" }) {
  const { user } = useUser();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopics = () => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URI}/topics`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error while fetching topics");
        }

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

  /* =========================
     SEARCH
  ========================= */

  let filteredTopics = topics.filter((topic) => {
    const title = topic.title?.toLowerCase() || "";

    const description = topic.description?.toLowerCase() || "";

    const searchValue = search?.toLowerCase() || "";

    return title.includes(searchValue) || description.includes(searchValue);
  });

  /* =========================
     FILTER
  ========================= */

  if (filter === "new") {
    filteredTopics = filteredTopics.filter((topic) => {
      const date = topic.creationdate || topic.creationDate;

      if (!date) return false;

      return new Date(date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    });
  }

  if (filter === "hot") {
    filteredTopics = filteredTopics.filter((topic) => {
      const posts = topic.posts.length;

      const date = topic.creationdate || topic.creationDate;

      if (!date) return false;

      return (
        posts >= 5 &&
        new Date(date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );
    });
  }

  if (filter === "mine") {
    filteredTopics = filteredTopics.filter(
      (topic) => topic.creator?._id === user?._id,
    );
  }

  /* =========================
     SORT
  ========================= */

  filteredTopics.sort((a, b) => {
    if (sort === "latest") {
      return (
        new Date(
          b.lastactivity || b.lastActivity || b.creationdate || b.creationDate,
        ) -
        new Date(
          a.lastactivity || a.lastActivity || a.creationdate || a.creationDate,
        )
      );
    }

    if (sort === "oldest") {
      return (
        new Date(a.creationdate || a.creationDate) -
        new Date(b.creationdate || b.creationDate)
      );
    }

    if (sort === "popular") {
      const postsA = a.nbrPosts ?? a.posts?.length ?? 0;

      const postsB = b.nbrPosts ?? b.posts?.length ?? 0;

      return postsB - postsA;
    }

    return 0;
  });

  /* =========================
     STATES
  ========================= */

  if (loading) {
    return <div className="loading-message">Loading the topics...</div>;
  }

  if (error) {
    return <div className="error-message">Error : {error}</div>;
  }


  return (
    <div className="topics">
      {filteredTopics.length === 0 && (
        <div className="no-topics">No topics found...</div>
      )}

      {filteredTopics.map((topic) => (
        <Topic
          key={topic._id}
          topicRoomURL={`/topic/${topic._id}`}
          title={topic.title}
          content={topic.description || "No description"}
          isNew={
            new Date(
              topic.lastactivity ||
                topic.lastActivity ||
                topic.creationdate ||
                topic.creationDate,
            ) > new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
          nbrPosts={topic.nbrPosts ?? topic.posts?.length ?? 0}
          author={topic.creator}
          avatar={topic.creator?.avatar}
          createdAt={topic.creationdate || topic.creationDate}
          category={topic.tags?.length > 0 ? topic.tags[0] : "General"}
          views={topic.views ?? 0}
        />
      ))}
    </div>
  );
}

export default Topics;
