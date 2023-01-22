import Container from "./Container.js";

function Gallery(props) {

  // console.log(props.gallery);
  //data.id is id from psql
  return (
    <div className="gallery">
    {props.gallery.map((data) => (
      <Container key={data.id} data={data} showModal={props.showModal} setButtonID={props.setButtonID} buttonID={data.id} />
    ))}

    </div>
  )
}

export default Gallery