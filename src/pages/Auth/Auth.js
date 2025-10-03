import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import starVideo from "../../assets/video/Red-Star-Looping-Background.mp4";

import "./Auth.css";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // partagé entre Login et Signup
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_API_URI}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", formData.email);
    setToken(newToken);
  };

  const handleSignup = (newToken) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", formData.email);
    setToken(newToken);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/Phorum");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        src={starVideo}
        id="star-BG"
        className={isLogin ? "white" : "red"}
        alt="Pretty stars"
      />

      <div id="cut" alt="cut"></div>
      <div id="cut-black" alt="black stupid square"></div>
      <section id="main-view">
        {!isLoggedIn && isLogin && (
          <LoginForm
            formData={formData}
            setFormData={setFormData}
            onLogin={handleLogin}
            switchToSignup={() => setIsLogin(false)}
          />
        )}
        {!isLoggedIn && !isLogin && (
          <SignupForm
            formData={formData}
            setFormData={setFormData}
            onSignup={handleSignup}
            switchToLogin={() => setIsLogin(true)}
          />
        )}
      </section>
    </>
  );
}

export default Auth;
