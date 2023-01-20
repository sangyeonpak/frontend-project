import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar.js";
import UserInfo from "./user-info/UserInfo.js";
import Gallery from "./gallery/Gallery.js";
import placeholder from "./images/placeholder.jpg";


function App() {
  const [gallery, setGallery] = useState({});

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
