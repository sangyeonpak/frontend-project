import { useState } from "react";

function ArtDropdown(props) {
  const [mouseState, showNavbar] = useState(false);

  function enterHandler(){
    showNavbar(true);
  }
  function exitHandler(){
    showNavbar(false);
  }
  return (
    <div className="bottombarLinks">
      <a href="#" rel="noreferrer" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>Art</a>
      {mouseState ?
      (<div className="dropdownMenu" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/visit/plan-your-visit" target="_blank" rel="noreferrer">The Met Collection</a></div>
        <div className="dropdownLinks"><a href="https://engage.metmuseum.org/admission" target="_blank" rel="noreferrer">Curatorial Areas</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/join-and-give/membership" target="_blank" rel="noreferrer">Convservation and Scientific Research</a></div>
      </div>)
      :
      null}
    </div>
  );
}

export default ArtDropdown;
