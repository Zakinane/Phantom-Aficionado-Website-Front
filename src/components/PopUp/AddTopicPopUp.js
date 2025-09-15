function AddTopicPopUp() {
  return (
    <div classname="add-topic-page" id="add-topic-page">
      <img
        alt=""
        id="close-topic-btn"
        src="../images/icons/X.png"
        onclick="closeAddTopicPage()"
      />
      <div classname="add-topic-pop-up">
        <h2>Create a new Topic:</h2>
        <form id="add-topic-form" autoComplete="off">
          <label htmlfor="topic-title">Topic's title:</label>
          <input type="text" id="topic-title" name="topic-title" required="" />
          <label htmlfor="topic-content">Content:</label>
          <textarea
            id="topic-content"
            name="topic-content"
            rows="{4}"
            required=""
            defaultvalue=""
          />
        </form>
      </div>
    </div>
  );
}
