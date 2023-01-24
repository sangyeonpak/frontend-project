function OffCanvas(props) {
  function closeCanvas() {
    props.showCanvas(false);
  }
  return (
    <>
      <div className="offCanvas">
        <button className="closeCanvas" onClick={closeCanvas}>x</button>
        <h3>On Display <span>({props.gallery.filter(container => container.image_id !== null).length})</span></h3>
        <ul>
          {(props.gallery.filter(container => container.image_id !== null)).map((data) => (
            <OnDisplayItem data={data} key={Math.random() * Math.random()} />
          ))}
        </ul>
        <h3>Seen <span>({props.seen.length})</span></h3>
        <ul>
          {props.seen.map((data) => (
            <SeenItem data={data} key={Math.random() * Math.random()} />
          ))}
        </ul>
      </div>
      <div onClick={closeCanvas} className="offCanvasBackdrop"></div>
    </>
  );
}

function OnDisplayItem(props) {
  const { image_id, artist, name, info_url } = props.data;
  return (
    <li>
      <a href={info_url} target="_blank" rel="noreferrer" className="listInfo">
        {artist} - {name}
      </a>
    </li>
  );
}

function SeenItem(props) {
  const { image_id, artist, name, info_url } = props.data;
  return (
    <li>
      <a href={info_url} target="_blank" rel="noreferrer" className="listInfo">
        {artist} - {name}
      </a>
    </li>
  );
}
export default OffCanvas;
