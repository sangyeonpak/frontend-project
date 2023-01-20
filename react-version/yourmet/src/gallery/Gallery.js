import Row from "./Row.js";

function Gallery(props) {
  function addRow(){
    return (
      <Row image={props.image}/>
    )
  }
  return (
    <div className="gallery">
      <Row image={props.image}/>
      <div className="addRowDiv">
        <button className="addRowButton" onClick={addRow}>+</button>
      </div>
    </div>
  )
}

export default Gallery