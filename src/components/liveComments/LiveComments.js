import "./LiveComments.css";

function LiveComments({ subtitle, username, message, percent }) {
  return (
    <div className="live-comments">
      <div className="poll-header">
        <div className="poll-title">
          <span className="q-icon">Q</span>
          <div className="text-area">
            <div className="title-sticker">PHAN-SiTE</div>
            <span className="subtitle">{subtitle}</span>
          </div>
        </div>

        <div className="poll-percent">
          <div className="percent-container">
            <span className="bar-yes">YES</span>
            <span className="bar-percent">{percent}%</span>
          </div>
          <div className="poll-bar">
            <div className="bar-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <div className="poll-message">
        <span className="username">{username}:</span> {message}
      </div>
    </div>
  );
}

export default LiveComments;
