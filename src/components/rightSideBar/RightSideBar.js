import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RightSideBar.css";

function RightSidebar() {
  const quickLinks = [
    {
      icon: "📄",
      title: "Rules",
      href: "/rules",
    },
    {
      icon: "?",
      title: "FAQ",
      href: "/faq",
    },
    {
      icon: "🎮",
      title: "Discord",
      href: "https://discord.gg/Tg3Hq8Cpu",
    },
    {
      icon: "✉",
      title: "Contact",
      href: "https://github.com/Zakinane",
    },
  ];

  const [activities, setActivities] = useState([]);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URI}/topics`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch activities");
        }

        const topics = await res.json();

        const posts = topics
          .flatMap((topic) =>
            (topic.posts || []).map((post, index) => ({
              ...post,

              // Topic information
              topicId: topic._id,
              topicTitle: topic.title,

              // WRONT TO CORRECT
              isFirstPost: index === 0,
            }))
          )
          .sort(
            (a, b) =>
              new Date(b.createdAt) -
              new Date(a.createdAt)
          )
          .slice(0, 5);

        setActivities(posts);
      } catch (err) {
        console.error(
          "Error fetching activities:",
          err
        );
      }
    };

    fetchActivities();
  }, []);


  const formatTime = (date) => {
    const seconds = Math.floor(
      (Date.now() - new Date(date)) / 1000
    );

    if (seconds < 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days}d`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 5) {
      return `${weeks}w`;
    }

    const months = Math.floor(days / 30);

    return `${months}mo`;
  };

  return (
    <aside className="right-sidebar">


      <section className="right-panel">

        <div className="right-panel-title">
          <span className="title-star">★</span>
          <h2>Quick Links</h2>
        </div>

        <div className="quick-links">

          {quickLinks.map((link) => {

            // External links
            if (link.href.startsWith("http")) {
              return (
                <a
                  key={link.title}
                  href={link.href}
                  className="quick-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="quick-link-icon">
                    {link.icon}
                  </span>

                  <span className="quick-link-title">
                    {link.title}
                  </span>
                </a>
              );
            }

            // Internal React Router links
            return (
              <Link
                key={link.title}
                to={link.href}
                className="quick-link"
              >
                <span className="quick-link-icon">
                  {link.icon}
                </span>

                <span className="quick-link-title">
                  {link.title}
                </span>
              </Link>
            );
          })}

        </div>
      </section>



      <section className="right-panel activity-panel">

        <div className="right-panel-title">
          <span className="title-lightning">⚡</span>
          <h2>Latest Activity</h2>
        </div>

        <div className="activity-list">

          {activities.length === 0 ? (

            <div className="activity-empty">
              No recent activity.
            </div>

          ) : (

            activities.map((activity) => (

              <Link
                to={`/topic/${activity.topicId}`}
                className="activity-item"
                key={activity._id}
              >


                <img
                  src={
                    activity.author?.avatar ||
                    "https://www.gravatar.com/avatar/?d=mp"
                  }
                  alt={
                    activity.author?.username ||
                    "User"
                  }
                  className="activity-avatar"
                />



                <div className="activity-info">

                  <div className="activity-description">

                    <strong>
                      {activity.author?.username ||
                        "Unknown User"}
                    </strong>

                    <span>
                      {activity.isFirstPost
                        ? " created a post "
                        : " replied to "}
                    </span>

                    <b>
                      {activity.topicTitle}
                    </b>

                  </div>



                  <div className="activity-preview">
                    {activity.content}
                  </div>

                </div>



                <span className="activity-time">
                  {formatTime(
                    activity.createdAt
                  )}
                </span>

              </Link>

            ))

          )}

        </div>
      </section>



      <div className="right-banner">

        <div className="banner-content">

          <span className="banner-small">
            FOR A
          </span>

          <strong>
            BETTER
          </strong>

          <strong>
            TOMORROW
          </strong>

        </div>

      </div>



    </aside>
  );
}

export default RightSidebar;