import { useState } from "react";

function VisitDropdown(props) {
  const [mouseState, showNavbar] = useState(false);

  function enterHandler(){
    showNavbar(true);
  }
  function exitHandler(){
    showNavbar(false);
  }
  return (
    <div className="bottombarLinks">
      <a href="#" rel="noreferrer" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>Visit</a>
      { mouseState ?
      (<div className="dropdownMenu" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/visit/plan-your-visit" target="_blank" rel="noreferrer">Plan Your Visit</a></div>
        <div className="dropdownLinks"><a href="https://engage.metmuseum.org/admission" target="_blank" rel="noreferrer">Buy Tickets</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/join-and-give/membership" target="_blank" rel="noreferrer">Become a Member</a></div>
        <div className="dropdownLinks"><a href="https://maps.metmuseum.org/?screenmode=base&floor=1#hash=17/40.779448/-73.963517/-61" target="_blank" rel="noreferrer">Museum Map</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/visit/dining" target="_blank" rel="noreferrer">Food and Drink</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/visit/group-visits" target="_blank" rel="noreferrer">Group Visits</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/visit/accessibility" target="_blank" rel="noreferrer">Accessibility</a></div>
      </div>)
      :
      null
      }
    </div>
  );
}

export default VisitDropdown;
