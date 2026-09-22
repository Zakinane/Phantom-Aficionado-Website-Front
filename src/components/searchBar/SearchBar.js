import "./SearchBar.css";

import { useUser } from "../../context/UserContext";

function SearchBar({ value, onChange }) {

  const { user } = useUser();

  return (
    <header className="phorum-header">


      <div className="header-red-shape header-shape-one"></div>

      <div className="header-red-shape header-shape-two"></div>



      <div className="header-brand">

        <div className="header-brand-title">
          P<span>H</span>ORUM
        </div>

        <div className="header-brand-subtitle">
          TAKE YOUR HEART
        </div>

      </div>



      <div className="search-container">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search the Phorum..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {value && (
          <button
            className="clear-search"
            onClick={() => onChange("")}
            type="button"
          >
            ×
          </button>
        )}

      </div>



      <div className="sidebar-profile">

        <div className="profile-icon">

          {user?.avatar ? (

            <img
              src={user.avatar}
              alt="Profile"
            />

          ) : (

            <span className="default-avatar">
              ?
            </span>

          )}

        </div>


        <div className="profile-info">

          <span>
            Hello
          </span>

          <strong>
            {user?.username || "User"}!
          </strong>

        </div>

      </div>

    </header>
  );
}

export default SearchBar;