import Container from "./Container.js";

function Gallery(props) {

  // console.log(props.gallery);
  return (
    <div className="gallery">
    {props.gallery.map((data) => (
      <Container key={data.id} data={data}/>
    ))}

    </div>
  )
}

export default Gallery