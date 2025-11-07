import { useState } from "react";
import "./Phorums.css";
import Topics from "../../components/topics/Topics";
import Title from "../../components/title/Title";
import AddTopicButton from "../../components/buttons/AddTopicButton";
import SearchBar from "../../components/searchBar/SearchBar";
import NewTopicModal from "../../components/newTopic/NewTopic";

function Phorums() {
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTopicCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setShowModal(false);
  };

  return (
    <div className="phorums">
      <div style={{position:"fixed",top:"60px", zIndex:120}}>
        <Title title={"PHORUM"} redIndex={1} />
      </div>
      <AddTopicButton onClick={() => setShowModal(true)} />

      <div className="background-title">
        <SearchBar />
      </div>

      <div className="topics-container">
        <Topics refreshTrigger={refreshTrigger} />
      </div>

      {showModal && (
        <NewTopicModal
          onClose={() => setShowModal(false)}
          onCreated={handleTopicCreated}
        />
      )}
    </div>
  );
}

export default Phorums;
