import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../../components/title/Title";
import "./Poll.css";

function Poll({ token }) {
  const [poll, setPoll] = useState(null);
  const [userVoted, setUserVoted] = useState(false);
  const [percentage, setPercentage] = useState(50); // default 50%

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/poll/current`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPoll(res.data);
        setPercentage(res.data.percentage || 50);

        if (res.data.userVote) setUserVoted(true);
      } catch (err) {
        console.error("Erreur lors du chargement du poll :", err);
        setPoll({
          question: "Do you believe in the Phantom Thieves?",
          votesCount: { yes: 0, no: 0 },
          totalVotes: 0,
        });
        setPercentage(50);
      }
    };
    fetchPoll();
  }, [token]);

  const handleVote = async (choice) => {
    if (userVoted) return;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/poll/vote`,
        {
          token,
          pollId: poll._id,
          choice,
        }
      );
      setPercentage(res.data.percentage);
      setUserVoted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur serveur");
    }
  };

  if (!poll) return <div style={{ color: "white" }}>Loading...</div>;

  return (
    <div className="poll">
      <div className="title-container">
        <Title title={`POLL \nOF THE WEEK`} redIndex={2} />
      </div>

      <div className="poll-container">
        <div className="poll-question">
          <p>
            <span style={{ fontSize: 45, color: "red" }}>Q</span>
            {poll.question}
          </p>
        </div>

        <div className="poll-result">
          <span style={{ fontSize: 45, color: "red" }}>A</span>
          <span className="poll-percentage" style={{ fontSize: 20 }}>
            YES
          </span>
          <span className="poll-percentage" style={{ fontSize: 100 }}>
            {percentage}
          </span>
          <span className="poll-percentage" style={{ fontSize: 60 }}>
            %
          </span>
          <center>
            <hr />
          </center>
        </div>

        <div className="poll-bar-border">
          <div className="poll-bar">
            <div className="poll-bar-yes" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        <div className="poll-options">
          <div
            className="poll-btn-border"
            id="poll-btn-yes"
            onClick={() => handleVote("yes")}
          >
            <div className="poll-btn" id="poll-btn-yes">
              YES
            </div>
          </div>
          <div
            className="poll-btn-border"
            id="poll-btn-no"
            onClick={() => handleVote("no")}
          >
            <div className="poll-btn" id="poll-btn-no">
              NO
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-message">Scroll to read comments</div>
      <div className="scroll-btn-container">
        <div className="scroll-btn">
          <img alt="" width="40px" src="../images/icons/arrow.png" />
        </div>
      </div>
    </div>
  );
}

export default Poll;
