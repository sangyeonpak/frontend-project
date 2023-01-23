import placeholder from "../images/placeholder.jpg";

function Container(props) {
  // console.log(props);
  console.log(props.data);
  const { image_id, artist, name, seen, year, image_url } = props.data;
  // console.log(artist);
  console.log(props.seen);
  const randomMargin = {
    marginTop: Math.floor(Math.random() * 51),
    marginLeft: Math.floor(Math.random() * 151),
  };

  function addArt() {
    props.showModal(true);
    props.setButtonID(props.buttonID);
  }

  function filledEye() {
    return (
      <button className="markUnseen" onClick={undoSeen}>
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
      <button className="markSeenButton" onClick={markSeen}>
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
      body: JSON.stringify(props.data),
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

  //style={{"marginTop": randomMargin.marginTop, "marginLeft": randomMargin.marginLeft}}
  return (
    <div className="container">
      <div className="imageContainer">
        <div>{props.buttonID}</div>
        <img
          src={image_url !== null ? image_url : placeholder}
          className="image"
        />
        <div>{artist}</div>
        <div>{name}</div>
        <div>{year}</div>
        <button className="addArtButton" onClick={addArt}>
          +
        </button>
        { (image_url !== null) ?
          (props.seen.some((match) => match.image_id === image_id) ? filledEye() : unfilledEye())
          :
          <></>
        }
      </div>
    </div>
  );
}

export default Container;
