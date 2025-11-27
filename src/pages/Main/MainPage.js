import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserProvider } from "../../context/UserContext";
import Sidebar from "../../components/sideBar/Sidebar";
import Shortcuts from "../../components/_shortcuts/Shortcuts";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [authChecked, setAuthChecked] = useState(false);

  const [collapsedBar, setCollapsedBar] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebar-collapsed");
      return saved !== null ? JSON.parse(saved) : false;
    } catch (e) {
      console.error("Invalid sidebar-collapsed value in localStorage:", e);
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsedBar));
  }, [collapsedBar]);

  useEffect(() => {
    if (!token) {
      navigate("/authentication"); // si pas de token
      return;
    }

    fetch(`${process.env.REACT_APP_API_URI}/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token invalid or expired");
      })
      .then(() => setAuthChecked(true))
      .catch((err) => {
        console.error("Auth verify failed:", err);
        localStorage.removeItem("token");
        navigate("/authentication");
      });
  }, [token, navigate]);

  if (!authChecked) return null;

  return (
    <UserProvider>
      <div className="main-page">
        <Shortcuts setCollapsed={setCollapsedBar} />
        <Sidebar collapsed={collapsedBar} setCollapsed={setCollapsedBar} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </UserProvider>
  );
};

export default MainPage;
