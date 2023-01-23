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
      <img src={metLogo} className="metLogo"></img>
      <div className="navbar">
        <div className="topbar">
          <div className="topbarLinks tickets">Buy tickets</div>
          <div className="topbarLinks member">Become a Member</div>
          <div className="topbarLinks donation">
            |
            <a href="" className="topbarLinks donation">
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
