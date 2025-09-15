import { useEffect, useState, useRef } from "react";
import "./StarBG.css";

const starShape = (
  <polygon points="493.9,0 646.5,309.2 987.8,358.8 740.8,599.5 799.1,939.4 493.9,779 188.6,939.4 246.9,599.5 0,358.8 341.3,309.2" />
);

function StarBG() {
  const [wrappers, setWrappers] = useState([]);
  const containerRef = useRef(null);   // 👈 ref pour accéder à .container
  const cap = 12;
  const delay = 1000;

  useEffect(() => {
    if (!containerRef.current) return;

    const { offsetWidth, offsetHeight } = containerRef.current;

    const tmp = [];
    for (let i = 0; i < 50; i++) {
      const ran = Math.floor(Math.random() * 10) + 1;
      const isSmall = Math.floor(Math.random() * 10) + 1;
      
      tmp.push({
        id: i,
        type: ran >= 8 ? "shrinker" : "grower",
        scale: isSmall >= 9 ? 0.7 : 1,
        rotate: Math.floor(Math.random() * 200),
        left: Math.floor(Math.random() * (offsetWidth - 125)),  
        top: Math.floor(Math.random() * (offsetHeight - 125)),  
        svgs: [],
        alt: true
      });
    }
    setWrappers(tmp);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWrappers((prev) =>
        prev.map((w) => {
          const newSvg = {
            id: Date.now() + Math.random(),
            color: w.alt ? "black" : "white",
            anim: w.type === "grower" ? "grow" : "shrink"
          };

          const nextAlt = !w.alt;

          const svgs = [...w.svgs, newSvg];
          if (svgs.length > cap) svgs.shift();

          return { ...w, svgs, alt: nextAlt };
        })
      );
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container" ref={containerRef}>
      {wrappers.map((w) => (
        <div
          key={w.id}
          className={`star-wrapper ${w.type}`}
          style={{
            transform: `rotate(${w.rotate}deg) scale(${w.scale})`,
            left: `${w.left}px`,
            top: `${w.top}px`
          }}
        >
          {w.svgs.map((s) => (
            <svg
              key={s.id}
              className={`star ${s.color} ${s.anim}`}
              viewBox="0 0 987.8 950"
            >
              {starShape}
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
}

export default StarBG;
