import { useState } from "react";
import "./Phorums.css";
import Chats from "../../components/chats/Chats";
import Title from "../../components/title/Title";
import AddTopicButton from "../../components/buttons/AddTopicButton";
import SearchBar from "../../components/searchBar/SearchBar";
import NewTopicModal from "../../components/newTopic/NewTopic"; // ← importe la modale

function Phorums() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="phorums">
      <Title title={"PHORUM"} redIndex={1} />

      <div className="background-title">
        <SearchBar />
        <AddTopicButton onClick={() => setShowModal(true)} />
      </div>

      <div className="messages-container">
        <Chats infos={"rien lol"} />
      </div>

      {/* Modale affichée si showModal = true */}
      {showModal && <NewTopicModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Phorums;
