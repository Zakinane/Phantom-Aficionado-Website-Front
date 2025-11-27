import { useState } from "react";
import "./Phorums.css";
import Topics from "../../components/topics/Topics";
import Title from "../../components/title/Title";
import AddTopicButton from "../../components/buttons/AddTopicButton";
import SearchBar from "../../components/searchBar/SearchBar";
import NewTopicModal from "../../components/newTopic/NewTopic";
import LiveComments from "../../components/liveComments/LiveComments";

function Phorums() {
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const handleTopicCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setShowModal(false);
  };

  return (
    <div className="phorums">
      <div style={{ position: "fixed", top: "60px", zIndex: 120 }}>
        <Title title={"PHORUM"} redIndex={1} />
      </div>
      <AddTopicButton onClick={() => setShowModal(true)} />

      <div className="background-title">
        <SearchBar value={searchValue} onChange={setSearchValue} />{" "}
      </div>

      <div className="topics-container">
        <Topics refreshTrigger={refreshTrigger} search={searchValue} />{" "}
      </div>
      <div className="live-comments-container">
        <div className="live-comments-background">
          <LiveComments
            subtitle={"A real good test to see how it works"}
            username={"Zak"}
            message={"Yo les gars"}
            percent={30}
          />
        </div>
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
