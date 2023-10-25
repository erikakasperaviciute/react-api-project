import "./SearchFormForNav.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchFormForNav() {
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    // e.preventDefault();
    navigate(`/search?search=${searchInput}`);
  };
  return (
    <form action="/search" onSubmit={handleSearchSubmit}>
      <div className="form-control">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for something..."
          className="search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <input type="submit" value="Search 🔍" className="search-btn" />
      </div>
    </form>
  );
}

export default SearchFormForNav;
