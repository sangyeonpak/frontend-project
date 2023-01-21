function Modal(props) {
  function closeModal(){
    props.showModal(false)
  }

  function searchForArt(){

  }
  return (
    <>
      <div className="modal">
        <p>Search for an artwork or artist</p>
        <input></input>
        <button onClick={closeModal}>Close</button>
        <button onClick={searchForArt}>Search</button>
      </div>
      <div className="modalBackdrop" onClick={closeModal}></div>
    </>
  )
}

export default Modal