import { useState } from "react";

function ResultArtwork(props) {
  const [image_id, setImageId] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [info_url, setInfoUrl] = useState("");
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [wing, setWing] = useState("");
  const [artistBorn, setArtistBorn] = useState("");
  const [artistDeath, setArtistDeath] = useState("");


  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.result}`,
    { mode: "cors" }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const {
        objectID,
        primaryImageSmall,
        objectURL,
        title,
        artistDisplayName,
        artistBeginDate,
        artistEndDate,
        objectDate,
        department,
      } = data;
      setImageId(objectID);
      setImageUrl(primaryImageSmall);
      setInfoUrl(objectURL);
      setName(title);
      setArtist(artistDisplayName);
      setArtistBorn(artistBeginDate);
      setArtistDeath(artistEndDate);
      setYear(objectDate);
      setWing(department);
    });


  return (
    <div className="resultContainer">
      <div className="resultImage">
        <a href={info_url} target="_blank">
          <img src={image_url} alt="Currently unavailable for view on YourMet. Click here to view the art on our main website."/>
        </a>
      </div>
      <div className="resultInfo">
        <p>{artist != "" ? `${artist} (${artistBorn}-${artistDeath})` : "Unknown artist"}</p>
        <p>{name != "" ? name : "Untitled"}</p>
        <p>{year != "" ? year : "Unknown date"}</p>
        <p>{wing != "" ? wing : "Currently not in display at the Met"}</p>
      </div>
    </div>
  )
}

export default ResultArtwork;
