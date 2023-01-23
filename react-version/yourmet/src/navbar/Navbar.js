import metLogo from "../images/metlogo.png";

function Navbar(props) {
  function showCanvasHandler() {
    props.showCanvas(true);
  }
  return (
    <div className="navbarWrapper">
      <img src={metLogo} className="metLogo"></img>
      <div className="navbar">
        <div className="topbar">
          <div className="topbarLinks">Buy tickets</div>
          <div className="topbarLinks member">Become a Member</div>
          <div className="topbarLinks donation">
            |
            <a href="" className="topbarLinks donation">
              Make a donation
            </a>
          </div>
        </div>
        <div className="bottombar">
          <div className="bottombarLinks">Visit</div>
          <div className="bottombarLinks">Exhibitions and Events</div>
          <div className="bottombarLinks">Art</div>
          <div className="bottombarLinks">Learn with Us</div>
          <div className="bottombarLinks">Research</div>
          <div className="bottombarLinks">Shop</div>
          <div className="listView" onClick={showCanvasHandler}>
            View Your Gallery
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
