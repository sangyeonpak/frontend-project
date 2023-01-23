// import DropdownTemplate from "./navbar-dropdowns/DropdownTemplate.jsx";

function Navbar() {
  return (
    <div className="navbarWrapper">
      <div className="navbar">
        <div className="topbar">
          <div className="topbarLinks">Buy tickets</div>
          <div className="topbarLinks">Become a Member</div>
          <div className="topbarLinks">Make a donation</div>
        </div>
        <div className="bottombar">
          <div className="bottombarLinks">Visit</div>
          <div className="bottombarLinks">Exhibitions and Events</div>
          <div className="bottombarLinks">Art</div>
          <div className="bottombarLinks">Learn with Us</div>
          <div className="bottombarLinks">Research</div>
          <div className="bottombarLinks">Shop</div>
          <button className="listView">List View</button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
