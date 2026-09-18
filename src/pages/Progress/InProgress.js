import { useNavigate } from "react-router-dom";
import "./InProgress.css";

function InProgress() {
  const navigate = useNavigate();

  return (
    <div className="in-progress-page">

      <div className="in-progress-red-shape shape-1"></div>
      <div className="in-progress-red-shape shape-2"></div>
      <div className="in-progress-red-shape shape-3"></div>

      <main className="in-progress-content">

        <div className="in-progress-small-title">
          PHAN-SITE
        </div>

        <h1>
          <span>COMING</span>
          <strong>SOON</strong>
        </h1>

        <div className="in-progress-line"></div>

        <p className="in-progress-message">
          THIS PAGE IS CURRENTLY
          <br />
          <strong>IN PROGRESS</strong>
        </p>

        <p className="in-progress-description">
          The Phantom Thieves are still working on this one.
          <br />
          Check back later!
        </p>

        <button
          className="back-main-button"
          onClick={() => navigate("/phorum")}
        >
          <span>←</span>
          BACK TO MAIN PAGE
        </button>

      </main>

      <div className="in-progress-footer">
        TAKE YOUR HEART
      </div>

    </div>
  );
}

export default InProgress;