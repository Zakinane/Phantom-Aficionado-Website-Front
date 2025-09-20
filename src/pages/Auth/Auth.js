import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import starVideo from "../../assets/video/Red Star Looping Background.mp4"

import "./Auth.css";

import StarBG from "../../components/bg/StarBG";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_API_URI}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }, [token]);

  const handleLogin = (userEmail, newToken) => {
    setEmail(userEmail);
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", userEmail);
    setToken(newToken);
  };

  const handleSignup = (userEmail, newToken) => {
    setEmail(userEmail);
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", userEmail);
    setToken(newToken);
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setIsLogin(true);
  //   setEmail("");
  //   localStorage.removeItem("token");
  //   setToken(null);
  // };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Phorum");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <video autoPlay loop muted playsInline
      src={starVideo}
        id="star-BG"
        className={isLogin ? "white" : "red"}
        alt="Pretty stars"
      />

      <div id="cut" alt="cut"></div>
      <div id="cut-black" alt="black stupid square"></div>
      <section id="main-view">
        {/* FORMS */}
        {!isLoggedIn && isLogin && (
          <LoginForm
            onLogin={handleLogin}
            switchToSignup={() => setIsLogin(false)}
          />
        )}
        {!isLoggedIn && !isLogin && (
          <SignupForm
            onSignup={handleSignup}
            switchToLogin={() => setIsLogin(true)}
          />
        )}
      </section>
    </>
  );
}

export default Auth;
