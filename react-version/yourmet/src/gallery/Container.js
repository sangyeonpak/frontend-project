import placeholder from "../images/placeholder.jpg";
import Modal from "../modal/Modal.js";

function Container(props) {
  // console.log(props);
  // console.log(props.data);
  const { artist, name, seen, year, image_url } = props.data;
  // console.log(artist);

  const randomMargin = {
    marginTop : Math.floor(Math.random()*51),
    marginLeft : Math.floor(Math.random()*151)
  }

  function addArt() {
    props.showModal(true);
    props.setButtonID(props.buttonID);
  }

  //style={{"marginTop": randomMargin.marginTop, "marginLeft": randomMargin.marginLeft}}
  return (
    <div className="container" >
      <div className="imageContainer" >
        <img src={placeholder} className="image"  />
        <div>{artist}h</div>
        <div>{name}g</div>
        <div>{year}f</div>
        <button className="addArtButton" onClick={addArt}>+</button>
        {(image_url == null) ? null : (<button>-</button>) }
      </div>
    </div>
  )
}

export default Container