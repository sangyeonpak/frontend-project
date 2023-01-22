import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar.js";
import UserInfo from "./user-info/UserInfo.js";
import Gallery from "./gallery/Gallery.js";
import Modal from "./modal/Modal.js";

function App() {
  const [gallery, setGallery] = useState([]);
  const [modalState, showModal] = useState(false);
  const [buttonID, setButtonID] = useState("");
  const [fetchSwitch, toggleFetchSwitch] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/api/main", {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
        let sortedData = data.sort((a, b) => (a.id > b.id ? 1 : -1));
        setGallery(sortedData);
      });
  }, [fetchSwitch]);


  function addRow() {
    fetch(`http://localhost:3001/api/art/`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    toggleFetchSwitch((prevState) => !prevState);
    setTimeout(() => {
      toggleFetchSwitch((prevState) => !prevState);
    }, "10");
  }

  return (
    <div className="App">
      <Navbar />
      <UserInfo gallery={gallery} />
      <Gallery
        gallery={gallery}
        showModal={showModal}
        setButtonID={setButtonID}
      />
      <div className="addRowDiv">
        <button className="addRowButton" onClick={addRow}>
          +
        </button>
      </div>
      {modalState ? (
        <Modal
          showModal={showModal}
          buttonID={buttonID}
          toggleFetchSwitch={toggleFetchSwitch}
        />
      ) : null}
    </div>
  );
}

export default App;
