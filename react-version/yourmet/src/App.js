import React, { useState } from "react";
import Navbar from "./navbar/Navbar.js";
import UserInfo from "./user-info/UserInfo.js";
import Gallery from "./gallery/Gallery.js";
import placeholder from "./images/placeholder.jpg";


function App() {
  const [gallery, setGallery] = useState({});
  const [row, setRow] = useState([]);
  const [image, setImage] = useState([]);
  return (
    <div className="App">
      <Navbar />
      <UserInfo />
      <Gallery image={image}/>
    </div>
  );
}

export default App;
