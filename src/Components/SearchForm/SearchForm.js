// import "./SearchForm.css";
// import { useState } from "react";

// function SearchForm({ onSearch }) {
//   const [searchInput, setSearchInput] = useState("");

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     onSearch(searchInput);
//   };
//   return (
//     <form onSubmit={handleSearchSubmit}>
//       <div className="form-control">
//         <input
//           type="text"
//           id="search"
//           name="search"
//           placeholder="Search for something..."
//           className="search-input"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//         />
//         <input type="submit" value="Search 🔍" className="search-btn" />
//       </div>
//     </form>
//   );
// }

// export default SearchForm;
