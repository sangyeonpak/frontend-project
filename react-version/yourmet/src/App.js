import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar.js";
import UserInfo from "./user-info/UserInfo.js";
import Gallery from "./gallery/Gallery.js";
import placeholder from "./images/placeholder.jpg";
import Modal from "./modal/Modal.js";


function App() {
  const [gallery, setGallery] = useState([]);
  const [modalState, showModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/main", {
      mode: "cors"
    })
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      });
  }, []);

  function addRow(){

  }

  const [image, setImage] = useState([]);
  return (
    <div className="App">
      <Navbar />
      <UserInfo gallery={gallery} />
      <Gallery gallery={gallery} showModal={showModal}/>
      <div className="addRowDiv">
        <button className="addRowButton" onClick={addRow}>+</button>
      </div>
      {modalState ? <Modal showModal={showModal}/> : null}
    </div>
  );
}

export default App;
