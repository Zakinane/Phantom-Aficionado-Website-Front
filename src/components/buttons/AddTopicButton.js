import "./AddTopicButton.css";
import plus from "../../assets/images/icons/+.png";

function AddTopicButton({ onClick }) {
  return (
    <div className="add-btn" id="add-btn-phorum" onClick={onClick}>
      <img alt="+" width="40px" src={plus} />
    </div>
  );
}

export default AddTopicButton;
