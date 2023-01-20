import Container from "./Container.js"

function Row(props) {
  return (
    <div className="row">
      <Container image={props.image}/>
      <Container image={props.image}/>
      <Container image={props.image}/>
    </div>
  )
}
export default Row