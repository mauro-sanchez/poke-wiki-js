import React, { useState } from "react";

export const PokeSearch = ({ handleSearch }) => {
  const [text, setText] = useState("");
  return (
    <div className="search">
      <div className="form-search">
        <input
          type="text"
          className="form-control"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(text);
            }
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="search-input"
        />
        <button
          type="button"
          className="btn btn-search"
          onClick={() => handleSearch(text)}
          id="search-button"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default PokeSearch;
