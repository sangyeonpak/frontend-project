import { useState } from "react";

function Exhibitions(props) {
  const [mouseState, showNavbar] = useState(false);

  function enterHandler(){
    showNavbar(true);
  }
  function exitHandler(){
    showNavbar(false);
  }
  return (
    <div className="bottombarLinks">
      <a href="#" rel="noreferrer" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>Exhibitions and Events</a>
      {mouseState ? (
      <div className="dropdownMenu" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/exhibitions" target="_blank" rel="noreferrer">Exhibitions</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/events/whats-on" target="_blank" rel="noreferrer">Events and Tours</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/events/whats-on?tab=Events&categories=Performances" target="_blank" rel="noreferrer">Performances</a></div>
      </div>)
      :
      null
      }
    </div>
  );
}

export default Exhibitions;
