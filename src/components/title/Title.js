import "./Title.css"

function Title({ title, redIndex }) {
  return (
    <div className="title">
      {title.split("").map((char, i) => (
        <span
          key={i}
          style={{ color: i === redIndex ? "rgb(222, 15, 15)" : "white" }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default Title;
