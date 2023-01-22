import { useState, useEffect } from "react";

function ResultArtwork(props) {
  const [artInfo, setArtInfo] = useState({});
  const buttonID = props.buttonID;
  const image_id = props.result;

  function addToGallery() {
    fetch(`http://localhost:3001/api/art/${buttonID}`, {
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(artInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(Object.getPrototypeOf(props))
    props.setArtWasSelected((prevState) => !prevState);
    // console.log(artInfo);
  }

  useEffect(() => {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${image_id}`,
      { mode: "cors" }
    )
      .then((res) => res.json())
      .then((data) => {
        let {
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
        if (artistDisplayName === "") artistDisplayName = "Unknown artist";
        if (title === "") title = "Untitled";
        if (objectDate === "") objectDate = "Unknown date";
        if (department === "")
          department = "Currently not in display at the Met";

        setArtInfo({
          buttonID: buttonID,
          image_id: objectID,
          image_url: primaryImageSmall,
          info_url: objectURL,
          name: title,
          artist: artistDisplayName,
          born: artistBeginDate,
          death: artistEndDate,
          year: objectDate,
          wing: department,
        });
      });
  }, [buttonID, image_id]);

  return (
    <div className="resultContainer">
      <div className="resultImage">
        <a href={artInfo.info_url} target="_blank" rel="noreferrer">
          <img
            src={artInfo.image_url}
            alt="Currently unavailable for view on YourMet. Click here to view the art on our main website."
          />
        </a>
      </div>
      <div className="resultInfo">
        <p>
          {artInfo.artist !== "Unknown artist"
            ? `${artInfo.artist} (${artInfo.born}-${artInfo.death})`
            : "Unknown artist"}
        </p>
        <p>{artInfo.name}</p>
        <p>{artInfo.year}</p>
        <p>{artInfo.wing}</p>
        <button onClick={addToGallery}>Add To Gallery</button>
      </div>
    </div>
  );
}

export default ResultArtwork;
