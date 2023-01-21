import { useState } from "react";
import ResultArea from "./ResultArea.js";

function Modal(props) {
  function closeModal() {
    setSearch("");
    setSearchResults({});
    props.showModal(false);
  }
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({});

  function searchForArt() {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      });
  }

  return (
    <>
      <div className="modal">
        <p>Search for an artwork or artist</p>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onSubmit={searchForArt}
        ></input>
        <button onClick={closeModal}>Close</button>
        <button onClick={searchForArt}>Search</button>
        <ResultArea searchResults={searchResults}/>
      </div>
      <div className="modalBackdrop"></div>
    </>
  );
}

export default Modal;
