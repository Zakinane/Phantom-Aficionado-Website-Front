import { useEffect } from "react";

function Shortcuts({ setCollapsed }) {
  useEffect(() => {
    const toggleBar = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener("keydown", toggleBar);
    return () => window.removeEventListener("keydown", toggleBar);
  }, [setCollapsed]);

//   useEffect(() => {
//     const addTopic = (e) => {
//       if (e.ctrlKey && e.key.toLowerCase === "l") {
//         e.preventDefault();
//         console.log("+")
//       }
//     };
//     window.addEventListener("keydown", addTopic);
//     return () => window.removeEventListener("keydown", addTopic);
//   }, [setCollapsed]);

  return null;
}

export default Shortcuts;
