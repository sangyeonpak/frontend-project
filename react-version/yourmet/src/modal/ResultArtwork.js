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
    props.toggleFetchSwitch((prevState) => !prevState);
    setTimeout(() => {
      props.toggleFetchSwitch((prevState) => !prevState);
    }, "25");
    props.closeModal();
  }

  function filledEye() {
    return (
      <button className="markUnseenResults" onClick={undoSeen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-eye-fill"
          viewBox="0 0 16 16"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
      </button>
    );
  }

  function unfilledEye() {
    return (
      <button className="markSeenButtonResults" onClick={markSeen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-eye"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
      </button>
    );
  }

  function markSeen() {
    fetch(`http://localhost:3001/api/seen/`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(artInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    props.toggleFetchSwitch((prevState) => !prevState);
    setTimeout(() => {
      props.toggleFetchSwitch((prevState) => !prevState);
    }, "10");
  }

  function undoSeen() {
    fetch(`http://localhost:3001/api/seen/${image_id}`, {
      mode: "cors",
      method: "DELETE",
      body: JSON.stringify({image_id}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    props.toggleFetchSwitch((prevState) => !prevState);
    setTimeout(() => {
      props.toggleFetchSwitch((prevState) => !prevState);
    }, "10")
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
  }, [buttonID, image_id, props.fetchSwitch]);



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
        <p className="resultInfoText">
          {artInfo.artist !== "Unknown artist"
            ? `${artInfo.artist} (${artInfo.born}-${artInfo.death})`
            : "Unknown artist"}
        </p>
        <p className="resultInfoText resultInfoName">{artInfo.name}</p>
        <p className="resultInfoText">{artInfo.year}</p>
        <p className="resultInfoText">{artInfo.wing}</p>
        <div className="resultButtonsDiv">
        {(props.seen.some((match) => match.image_id === image_id) ? filledEye() : unfilledEye())}
        <button className="addToGalleryButton" onClick={addToGallery}>+</button>
        </div>
      </div>
    </div>
  );
}

export default ResultArtwork;
