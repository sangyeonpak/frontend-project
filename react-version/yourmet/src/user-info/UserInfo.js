function UserInfo(props) {
  return (
    <div className="userInfo">
      <div className="username">Sangyeon's Met</div>
      <div className="userStats">
        Seen <span className="userStats">{props.seen.length}</span> artworks and a curator of <span className="userStats">{props.gallery.filter(container => container.image_id !== null).length}</span>.
      </div>
    </div>
  )
}

export default UserInfo