import "./Prompt.css";

function Prompt({ title, description, buttons }) {
  return (
    <div className="prompt-overlay">
      <div className="prompt-popup">
        <h2 className="prompt-title">{title}</h2>

        {description && <p className="prompt-description">{description}</p>}

        {buttons ? (
          <div className="prompt-buttons">
            {buttons.map((btn, i) => (
              <div key={i}>{btn}</div>
            ))}
          </div>
        ) : (
          <div>Ok</div>
        )}
      </div>
    </div>
  );
}

export default Prompt;