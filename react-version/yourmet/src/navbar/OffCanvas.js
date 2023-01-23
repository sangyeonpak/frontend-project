function OffCanvas(props) {
  console.log(props.gallery);
  return (
    <div className="offCanvas">
      <h3>On Display</h3>
      <ul>
        {props.gallery.map((data) => (
          <OnDisplayItem data={data} key={Math.random()*Math.random()} />
        ))}
      </ul>
    </div>
  );
}

function OnDisplayItem(props) {
  const { image_id, artist, name } = props.data;
  return (
    <li>
      {artist} - {name}
    </li>
  );
}

export default OffCanvas;
