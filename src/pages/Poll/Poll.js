import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/title/Title";
import { useUser } from "../../context/UserContext";
import "./Poll.css";

function Poll() {
  const { user } = useUser();

  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const [poll, setPoll] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [percentage, setPercentage] = useState(50);

  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [creating, setCreating] = useState(false);

  const API_URL = process.env.REACT_APP_API_URI;

  // Récupérer le VRAI JWT
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_URL}/poll/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPoll(res.data);
        setPercentage(res.data.percentage ?? 50);
        setUserVoted(!!res.data.userVote);
      } catch (err) {
        console.error("Error fetching poll:", err);

        if (err.response?.status === 404) {
          setPoll(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [token, API_URL]);

  const handleVote = async (choice) => {
    if (
      userVoted ||
      voting ||
      !poll?._id ||
      !token
    ) {
      return;
    }

    try {
      setVoting(true);

      const res = await axios.post(
        `${API_URL}/poll/vote`,
        {
          pollId: poll._id,
          choice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPercentage(res.data.percentage);
      setUserVoted(true);

      setPoll((prev) => ({
        ...prev,
        totalVotes: (prev.totalVotes || 0) + 1,
        votesCount: {
          ...prev.votesCount,
          [choice]: (prev.votesCount?.[choice] || 0) + 1,
        },
      }));
    } catch (err) {
      console.error("Vote error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to submit your vote."
      );
    } finally {
      setVoting(false);
    }
  };

  const handleCreatePoll = async () => {
    if (!newQuestion.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (!token) {
      alert("Authentication token missing.");
      return;
    }

    try {
      setCreating(true);

      const res = await axios.post(
        `${API_URL}/poll/create`,
        {
          question: newQuestion.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPoll(res.data);
      setPercentage(50);
      setUserVoted(false);

      setShowCreatePoll(false);
      setNewQuestion("");
    } catch (err) {
      console.error("Create poll error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to create poll."
      );
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ color: "white" }}>
        Loading...
      </div>
    );
  }

  if (!token || !user) {
    return (
      <div style={{ color: "white" }}>
        Please log in to participate in the poll.
      </div>
    );
  }

  /*
   * NO ACTIVE POLL
   */
  if (!poll) {
    return (
      <div className="poll">
        <div className="poll-container">

          <h2>No active poll</h2>

          {user.role === "admin" && (
            <>
              {!showCreatePoll && (
                <button
                  onClick={() => setShowCreatePoll(true)}
                  className="create-poll-button"
                >
                  CREATE A POLL
                </button>
              )}

              {showCreatePoll && (
                <div className="create-poll-form">

                  <input
                    type="text"
                    placeholder="Enter poll question..."
                    value={newQuestion}
                    onChange={(e) =>
                      setNewQuestion(e.target.value)
                    }
                    maxLength={200}
                  />

                  <button
                    onClick={handleCreatePoll}
                    disabled={creating}
                  >
                    {creating ? "CREATING..." : "CREATE"}
                  </button>

                  <button
                    onClick={() => {
                      setShowCreatePoll(false);
                      setNewQuestion("");
                    }}
                    disabled={creating}
                  >
                    CANCEL
                  </button>

                </div>
              )}
            </>
          )}

        </div>
      </div>
    );
  }

  /*
   * ACTIVE POLL
   */
  return (
    <div className="poll">

      <div
        style={{
          position: "fixed",
          top: "60px",
          width: "450px",
          zIndex: 120,
        }}
      >
        <Title
          title={`POLL \nOF THE WEEK`}
          redIndex={2}
        />
      </div>

      <div className="poll-container">

        <div className="poll-question">
          <p>
            <span
              style={{
                fontSize: 45,
                color: "red",
              }}
            >
              Q
            </span>

            {poll.question}
          </p>
        </div>

        <div className="poll-result">

          <span
            style={{
              fontSize: 45,
              color: "red",
            }}
          >
            A
          </span>

          <span
            className="poll-percentage"
            style={{
              fontSize: 20,
            }}
          >
            YES
          </span>

          <span
            className="poll-percentage"
            style={{
              fontSize: 100,
            }}
          >
            {percentage}
          </span>

          <span
            className="poll-percentage"
            style={{
              fontSize: 60,
            }}
          >
            %
          </span>

          <center>
            <hr />
          </center>

        </div>

        <div className="poll-bar-border">
          <div className="poll-bar">
            <div
              className="poll-bar-yes"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>

        <div className="poll-options">

          <div
            className={`poll-btn-border ${
              userVoted ? "disabled" : ""
            }`}
            id="poll-btn-yes"
            onClick={() => handleVote("yes")}
          >
            <div
              className="poll-btn"
              id="poll-btn-yes-inner"
            >
              {voting ? "..." : "YES"}
            </div>
          </div>

          <div
            className={`poll-btn-border ${
              userVoted ? "disabled" : ""
            }`}
            id="poll-btn-no"
            onClick={() => handleVote("no")}
          >
            <div
              className="poll-btn"
              id="poll-btn-no-inner"
            >
              {voting ? "..." : "NO"}
            </div>
          </div>

        </div>

        {userVoted && (
          <p
            style={{
              color: "white",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            You already voted on this poll.
          </p>
        )}

      </div>
    </div>
  );
}

export default Poll;