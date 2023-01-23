import { useState } from "react";

function LearnWithUs(props) {
  const [mouseState, showNavbar] = useState(false);

  function enterHandler(){
    showNavbar(true);
  }
  function exitHandler(){
    showNavbar(false);
  }
  return (
    <div className="bottombarLinks">
      <a href="#" rel="noreferrer" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>Learn With Us</a>
      {mouseState ?
      (<div className="dropdownMenu" onMouseEnter={enterHandler} onMouseLeave={exitHandler}>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/learn/learning-resources" target="_blank" rel="noreferrer">Learning Resources</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/art/metpublications" target="_blank" rel="noreferrer">Publications</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/toah/" target="_blank" rel="noreferrer">Timeline of Art History</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/learn/workshops-and-activities" target="_blank" rel="noreferrer">Workshop and Activities</a></div>
        <div className="dropdownLinks"><a href="https://www.metmuseum.org/perspectives" target="_blank" rel="noreferrer">Articles, Videos, and Podcasts</a></div>
      </div>)
      :
      null
      }
    </div>
  );
}

export default LearnWithUs;
