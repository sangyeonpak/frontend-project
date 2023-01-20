import placeholder from "../images/placeholder.jpg";

function Container(props) {
  // console.log(props.image);
  return (
    <div className="container">
      <div className="imageContainer">
        <img src={placeholder} className="image" />
      </div>
    </div>
  )
}

export default Container