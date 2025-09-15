// INCOMPLETE

import React, { useState } from "react";
import "./AnswerButton.css";

function AnswerButton({
  text = "Looking cool Joker!",
  isComingLeft = "true",
  hasBorder = "true",
  shape = "NoTail",
}) {
  // Points for the Clip-path Polygone
  const basePoints = [
    { x: 9, y: 0 },
    { x: 100, y: 26 },
    { x: 100, y: 76 },
    { x: 0, y: 100 },
  ];
  const [points, setPoints] = useState(basePoints);

  // Moving animation
  function randomizePoints() {
    return basePoints.map(({ x, y }) => ({
      x: Math.min(100, Math.max(0, x + (Math.random() * 10 - 5))),
      y: Math.min(100, Math.max(0, y + (Math.random() * 10 - 5))),
    }));
  }

  const [intervalId, setIntervalId] = useState(null);

  function handleMouseEnter() {
    if (!intervalId) {
      setPoints(randomizePoints()); //déput instentanné

      const id = setInterval(() => {
        setPoints(randomizePoints());
      }, 200);
      setIntervalId(id);
    }
  }

  function handleMouseLeave() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setPoints(basePoints);
  }

  const clipPathValue = `polygon(${points
    .map((p) => `${p.x}% ${p.y}%`)
    .join(", ")})`;

  console.log(clipPathValue);

  return (
    <div
      className="answer-button-container"
      style={{
        display: hasBorder ? "block" : "none",
        clipPath: clipPathValue,
        transform: isComingLeft ? "scale(-1, 1)" : "scale(1, 1)",
      }}
             onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
    >
      <div
        className={`answer-button ${hasBorder ? "with-border" : ""}`}
        style={{
          clipPath: clipPathValue,
        }}
 
      >
        <span
          style={{
            transform: isComingLeft ? "scale(-1, 1)" : "scale(1, 1)",
            display: "inline-block",
          }}
        >
          {text}
        </span>
        {shape !== "NoTail" && <div className={`tail ${shape}`} />}
      </div>
    </div>
  );
}

export default AnswerButton;
