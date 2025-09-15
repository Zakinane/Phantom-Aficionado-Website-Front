import { Link } from "react-router-dom";
import { useEffect } from "react";
import PhanSiteLogo from "../../assets/images/PhanSiteLogo.png";
import DechireFinn from "../../assets/images/dechireFinn.png";
import MonNom from "../../assets/images/MonNom.png";

import "./Landing.css";

function Landing() {
  useEffect(() => {
    document.body.classList.add("landing-body");
    return () => {
      document.body.classList.remove("landing-body");
    };
  }, []);
  return (
    <>
      <div className="grid">
        <header>
          <Link to="./Authentication">
            <img id="phansiteLogo" src={PhanSiteLogo} alt="Phan-site Logo" />
          </Link>
        </header>

        <Link to="./Authentication">
          <img src={DechireFinn} id="dechire" alt="line" />
        </Link>

        <div className="creditsContainer">
          <a
            href="https://github.com/Zakinane"
            target="_blank"
            rel="noreferrer"
          >
            <img className="credits" src={MonNom} alt="Zak" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
