import { useState } from "react";

function ResultArtwork(props) {
  const [image_id, setImageId] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [info_url, setInfoUrl] = useState("");
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [wing, setWing] = useState("");


  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.result}`,
    { mode: "cors" }
  )
    .then((res) => res.json())
    .then((data) => {
      const {
        objectID,
        primaryImageSmall,
        objectURL,
        title,
        artistDisplayName,
        objectDate,
        department,
      } = data;
      setImageId(objectID);
      setImageUrl(primaryImageSmall);
      setInfoUrl(objectURL);
      setName(title);
      setArtist(artistDisplayName);
      setYear(objectDate);
      setWing(department);
    });


  return (
    <div>
      <img className="resultImage"src={image_url}/>
    </div>
  )
}

export default ResultArtwork;
