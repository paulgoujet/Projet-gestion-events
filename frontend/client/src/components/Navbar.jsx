import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">EventManager</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Événements</Link></li>
        <li><Link to="/login">Connexion</Link></li>
        <li><Link to="/register">Inscription</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
