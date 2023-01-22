import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar.js";
import UserInfo from "./user-info/UserInfo.js";
import Gallery from "./gallery/Gallery.js";
import Modal from "./modal/Modal.js";


function App() {
  const [gallery, setGallery] = useState([]);
  const [modalState, showModal] = useState(false);
  const [buttonID, setButtonID] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/main", {
      mode: "cors"
    })
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      });
  }, []);
  console.log(gallery);

  function addRow(){

  }

  return (
    <div className="App">
      <Navbar />
      <UserInfo gallery={gallery} />
      <Gallery gallery={gallery} showModal={showModal} setButtonID={setButtonID}/>
      <div className="addRowDiv">
        <button className="addRowButton" onClick={addRow}>+</button>
      </div>
      {modalState ? <Modal showModal={showModal} buttonID={buttonID}/> : null}
    </div>
  );
}

export default App;
