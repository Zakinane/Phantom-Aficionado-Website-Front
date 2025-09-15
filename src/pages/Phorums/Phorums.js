import "./Phorums.css";
import Chat from "../../components/chats/Chat";

function Phorums() {
  return (
    <div className="phorums">
      <div className="background-title">
        <center>
          <div className="search-bar-border" />
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <a href=".">
              <img
                alt=""
                className="search-icon"
                src="../images/icons/monocle.png"
              />
            </a>
          </div>
        </center>
        <div className="title">
          <div id="PHORUM">
            P<span style={{ color: "rgb(222, 15, 15)" }}>H</span>ORUM
          </div>
        </div>
      </div>
      <div className="messages-container">
        <div className="messages">{Chat}</div>
      </div>
    </div>
  );
}

export default Phorums;
