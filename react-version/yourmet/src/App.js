import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar.js";
import UserInfo from "./user-info/UserInfo.js";
import Gallery from "./gallery/Gallery.js";
import placeholder from "./images/placeholder.jpg";


function App() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/main", {
      mode: "cors"
    })
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      });
  }, []);
  // console.log(gallery);

  function addRow(){

  }
  const [image, setImage] = useState([]);
  return (
    <div className="App">
      <Navbar />
      <UserInfo />
      <Gallery gallery={gallery}/>
      <div className="addRowDiv">
        <button className="addRowButton" onClick={addRow}>+</button>
      </div>
    </div>
  );
}

export default App;
