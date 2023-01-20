import classes from "./DropdownTemplate.module.css"

function DropdownTemplate(props) {
  const array = Object.keys(props);
  const sliced = array.slice(1);

  const hoverHandler = () => {};

  return (
    <div>
      <ul>
        <li className={classes.NavbarItem} onMouseEnter={hoverHandler}>
          {array[0]}
        </li>
        <div className={classes.DropdownMenu}>
          {sliced.map((item) => (
            <li>{item}</li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default DropdownTemplate;
