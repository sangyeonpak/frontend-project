function UserInfo(props) {
  return (
    <div>
      <div>Sangyeon's Met</div>
      <h1>
        Seen <span>{props.seen.length}</span> artworks and a curator of <span>{props.gallery.filter(container => container.image_id !== null).length}</span>.
      </h1>
    </div>
  )
}

export default UserInfo