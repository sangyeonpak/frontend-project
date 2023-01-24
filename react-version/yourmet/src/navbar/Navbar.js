import metLogo from "../images/metlogo.png";
import VisitDropdown from "./dropdowns/Visit.jsx";
import Exhibitions from "./dropdowns/Exhibitions.jsx";
import ArtDropdown from "./dropdowns/Art.jsx";
import LearnWithUs from "./dropdowns/LearnWithUs.jsx";
import ResearchDropdown from "./dropdowns/Research.jsx";

function Navbar(props) {

  function showCanvasHandler() {
    props.showCanvas(true);
  }

  return (
    <div className="navbarWrapper">
      <a href="https://www.metmuseum.org/" target="_blank" rel="noreferrer">
        <img src={metLogo} className="metLogo"></img>
      </a>
      <div className="navbar">
        <div className="topbar">
          <div className="topbarLinks tickets"><a href="https://engage.metmuseum.org/admission/?promocode=48946" target="_blank" rel="noreferrer">Buy tickets</a></div>
          <div className="topbarLinks member"><a href="https://engage.metmuseum.org/members/members-count/?promocode=49261" target="_blank" rel="noreferrer">Become a Member</a></div>
          <div className="topbarLinks donation">
            |
            <a href="https://engage.metmuseum.org/donate?promocode=49278" target="_blank" rel="noreferrer" className="topbarLinks donation">
              Make a donation
            </a>
          </div>
        </div>
        <div className="bottombar">
          <VisitDropdown />
          <Exhibitions />
          <ArtDropdown />
          <LearnWithUs />
          <ResearchDropdown />
          <div className="bottombarLinks"><a href="https://www.metmuseum.org/shop" target="_blank" rel="noreferrer">Shop</a></div>
          <div className="listView" onClick={showCanvasHandler}>
            Gallery List View
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
