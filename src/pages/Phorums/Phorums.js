import { useState } from "react";
import "./Phorums.css";
import Topics from "../../components/topics/Topics";
import Title from "../../components/title/Title";
import AddTopicButton from "../../components/buttons/AddTopicButton";
import SearchBar from "../../components/searchBar/SearchBar";
import NewTopicModal from "../../components/newTopic/NewTopic";

function Phorums() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="phorums">
      <Title title={"PHORUM"} redIndex={1} />
      <AddTopicButton onClick={() => setShowModal(true)} />

      <div className="background-title">
        <SearchBar />
      </div>

      <div className="topics-container">
        <Topics />
      </div>

      {showModal && <NewTopicModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Phorums;
