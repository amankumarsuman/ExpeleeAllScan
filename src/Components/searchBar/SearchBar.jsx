// import React, { useState } from "react";
// import "./SearchBar.css";

// function SearchBar() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Do something with the search term, such as query the Ethereum blockchain
//     console.log(`Searching for ${searchTerm}...`);
//   };

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-bar">
//       <input
//         type="text"
//         placeholder="Search transactions, addresses, or blocks..."
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }

// export default SearchBar;

import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the search term, such as query the Ethereum blockchain
    console.log(`Searching for ${searchTerm}...`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search transactions, addresses, or blocks..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;
