import { Link } from "react-router-dom";
import { useEffect } from "react";
import PhanSiteLogo from "../../assets/images/PhanSiteLogo.png";
import DechireFinn from "../../assets/images/dechireFinn.png";
import MonNom from "../../assets/images/MonNom.png";

import "./Landing.css";

function Landing() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    // change le fond de body (stupid solution)
    document.body.classList.add("landing-body");
    return () => {
      document.body.classList.remove("landing-body");
    };
  }, []);
  return (
    <>
      <div className="grid">
        <header>
          <Link to={token ? "./phorum" : "./authentication"}>
            <img id="phansiteLogo" src={PhanSiteLogo} alt="Phan-site Logo" />
          </Link>
        </header>

        <Link to={token ? "./phorum" : "./authentication"}>
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
