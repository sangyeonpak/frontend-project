import { useState } from "react";

function ResearchDropdown(props) {
  const [mouseState, showNavbar] = useState(false);

  function enterHandler(){
    showNavbar(true);
  }
  function exitHandler(){
    showNavbar(false);
  }
  return (
    <div className="bottombarLinks">
      <a href="#" rel="noreferrer" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>Research</a>
      {mouseState ?
      <div className="dropdownMenu" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/art/libraries-and-research-centers" target="_blank" rel="noreferrer">Libraries and Research Centers</a></div>
      </div>
      :
      null
      }
    </div>
  );
}

export default ResearchDropdown;
