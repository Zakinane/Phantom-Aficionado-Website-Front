import "./SearchBar.css"

function SearchBar() {
  return (
    <>
      <div className="search-bar-border" />
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        {/* <a href=".">
          <img
            alt=""
            className="search-icon"
            src="../../assets/images/monocle.png"
          />
        </a> */}
      </div>
    </>
  );
}

export default SearchBar