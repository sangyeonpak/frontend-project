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
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      });
  }

  return (
    <>
      <div className="modal">
        <div className="searchDiv">
          <div className="searchTextSeparator"></div>
          <div className="searchText">Search for an artwork or artist</div>
        </div>
          <input
            className="searchBox"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onSubmit={searchForArt}
          ></input>
          <button className="closeModalButton" onClick={closeModal}>X</button>
          <button className="submitSearchButton" onClick={searchForArt}>Search</button>
        <ResultArea
          searchResults={searchResults}
          buttonID={props.buttonID}
          closeModal={closeModal}
          seen={props.seen}
          toggleFetchSwitch={props.toggleFetchSwitch}
          fetchSwitch={props.fetchSwitch}
        />
      </div>
      <div className="modalBackdrop"></div>
    </>
  );
}

export default Modal;
