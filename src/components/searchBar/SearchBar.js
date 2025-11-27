import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <>
      <div className="search-bar-border" />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </>
  );
}

export default SearchBar;
