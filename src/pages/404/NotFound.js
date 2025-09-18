import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound(){
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <button className="back-btn" onClick={() => navigate("/phorum")}>
          Go back to the Phorum
        </button>
      </div>
    </div>
  );
};

export default NotFound;
