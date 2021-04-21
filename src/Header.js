import carrot from "./assets/carrot-solid.svg";
import peaches from "./assets/peach-granola.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHeart } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const home = (
    <FontAwesomeIcon
      icon={faHome}
      size="2x"
      color="#ffb454"
      aria-hidden="false"
    />
  );

  const heart = (
    <FontAwesomeIcon
      icon={faHeart}
      size="2x"
      color="#ffb454"
      aria-hidden="false"
    />
  );
  return (
    <header>
      <div className="titleBar wrapper">
        <div className="logo">
          <img src={carrot} alt="carrot logo" />
          <h1>A Smarter Snack</h1>
        </div>
        <nav>
          <ul>
            <Link to="/">
              <li>
                {home}
                <span className="visuallyHidden">Home</span>
              </li>
            </Link>
            <Link to="/SavedSnacks">
              <li>
                {heart}
                <span className="visuallyHidden">Saved Snacks</span>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <img
        className="headerImg"
        src={peaches}
        alt="Bowls of Peaches and Granola with Yogurt."
      />
      <div className="description">
        <p>
          Keep snack time healthy with our suggestions to replace those sweet
          treats!
        </p>
      </div>
    </header>
  );
};

export default Header;
