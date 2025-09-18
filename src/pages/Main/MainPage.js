import Phorums from "../Phorums/Phorums";
import "./MainPage.css";
import Sidebar from "../../components/sideBar/Sidebar";

function MainPage() {
  return (
    <div className="main-page">
      <Sidebar />
      <div className="content-area">
        <Phorums />
      </div>
    </div>
  );
}

export default MainPage;
