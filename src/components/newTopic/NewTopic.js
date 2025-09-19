import "./NewTopic.css";

const NewTopic = ({ onClose }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">New Topic</h2>

        <input
          type="text"
          className="input-title"
          placeholder="Input the Subject Title"
        />

        <button className="poll-btn">ADD A MINI-POLL</button>

        <div className="editor">
          <div className="toolbar">
            <button>B</button>
            <button>U</button>
            <button>S</button>
            <button>≡</button>
            <button>“ ”</button>
            <button>{`</>`}</button>
            <button>🔗</button>
            <button>😊</button>
            <button>🖼️</button>
            <button>?</button>
            <span className="preview">PREVIEW</span>
          </div>
          <textarea placeholder="To keep discussions pleasant, we thank you for remaining polite in all circumstances :)"></textarea>
        </div>

        <button className="post-btn">POST</button>
      </div>
    </div>
  );
};

export default NewTopic;
