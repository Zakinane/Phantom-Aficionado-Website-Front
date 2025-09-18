import "./Phorums.css";
import Chats from "../../components/chats/Chats";
import Title from "../../components/title/Title";
import SearchBar from "../../components/searchBar/SearchBar";

function Phorums() {
  return (
    <div className="phorums">
      <Title title={"PHORUM"} redIndex={1} />
      <div className="background-title">
        <SearchBar />
      </div>
      <div className="messages-container">
        <Chats infos={"rien lol"} />
      </div>
    </div>
  );
}

export default Phorums;
