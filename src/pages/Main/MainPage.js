import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sideBar/Sidebar";
import "./MainPage.css";

const MainPage = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/authentication"); // redirige si pas de token
  }, [token, navigate]);

  return (
    <div className="main-page">
      <Sidebar />
      <div className="content-area">{children}</div>
    </div>
  );
};

export default MainPage;
