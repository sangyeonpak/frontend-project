import placeholder from "../images/placeholder.jpg";

function Container(props) {
  // console.log(props);
  console.log(props.data);
  const { artist, name, seen, year, image_url } = props.data;
  // console.log(artist);
  return (
    <div className="container">
      <div className="imageContainer">
        <img src={placeholder} className="image" />
        <div>{artist}h</div>
        <div>{name}g</div>
        <div>{year}f</div>
        <button className="addArt">+</button>
        {(image_url == null) ? null : (<button>-</button>) }
      </div>
    </div>
  )
}

export default Container