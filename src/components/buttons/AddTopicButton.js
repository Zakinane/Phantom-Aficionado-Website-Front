import "./AddTopicButton.css";

function AddTopicButton() {
  return (
    <div classname="add-btn-container">
      <div classname="add-btn" id="add-btn-phorum" onclick="openAddTopicPage()">
        <img alt="" width="40px" src="../images/icons/+.png" />
      </div>
    </div>
  );
}

export default AddTopicButton