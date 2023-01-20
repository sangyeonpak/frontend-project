import Container from "./Container.js"

function Row(props) {
  return (
    <div className="row">
      <Container gallery={props.gallery}/>
      <Container gallery={props.gallery}/>
      <Container gallery={props.gallery}/>
    </div>
  )
}
export default Row