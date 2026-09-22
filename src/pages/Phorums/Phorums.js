import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import "./Phorums.css";

import Topics from "../../components/topics/Topics";
import AddTopicButton from "../../components/buttons/AddTopicButton";
import NewTopicModal from "../../components/newTopic/NewTopic";

function Phorums() {
  const { search } = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [activeFilter, setActiveFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  const handleTopicCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setShowModal(false);
  };

  const filters = [
    {
      id: "all",
      icon: "▰",
      label: "All Topics",
    },
    {
      id: "hot",
      icon: "♨",
      label: "Hot",
    },
    {
      id: "new",
      icon: "✦",
      label: "New",
    },
    {
      id: "mine",
      icon: "⬢",
      label: "My Topics",
    },
  ];

  return (
    <div className="phorums">

      <section className="phorum-banner"></section>


      <section className="phorum-toolbar">
        <div className="topic-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={
                activeFilter === filter.id
                  ? "topic-filter active"
                  : "topic-filter"
              }
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="filter-icon">{filter.icon}</span>

              <span>{filter.label}</span>
            </button>
          ))}

          <AddTopicButton onClick={() => setShowModal(true)} />
        </div>


        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Latest</option>

          <option value="oldest">Oldest</option>

          <option value="popular">Popular</option>
        </select>
      </section>


      <section className="topics-container">
        <Topics
          refreshTrigger={refreshTrigger}
          search={search}
          filter={activeFilter}
          sort={sort}
        />
      </section>


      <footer className="phorum-footer">
        <span>PHORUM</span>

        <span className="footer-dot">•</span>

        <span>Persona 5 Phansite</span>

        <span className="footer-dot">•</span>

        <span>Made by Zak</span>
      </footer>


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
