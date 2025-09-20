import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sideBar/Sidebar";
import Shortcuts from "../../components/_shortcuts/Shortcuts";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [collapsedBar, setCollapsedBar] = useState(() => {
    try {
      const saved = localStorage.getItem("sidebar-collapsed");
      return saved !== null ? JSON.parse(saved) : false;
    } catch (e) {
      console.error("Invalid sidebar-collapsed value in localStorage:", e);
      return false; // fallback si parse échoue
    }
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsedBar));
  }, [collapsedBar]);

  useEffect(() => {
    if (!token) navigate("/authentication"); // redirige si pas de token
  }, [token, navigate]);

  return (
    <div className="main-page">
      <Shortcuts setCollapsed={setCollapsedBar} />
      <Sidebar collapsed={collapsedBar} setCollapsed={setCollapsedBar} />
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
