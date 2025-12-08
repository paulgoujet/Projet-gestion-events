import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">EventManager</Link>
      </div>

      <ul className="navbar-links">

        <li><Link to="/">Événements</Link></li>
        {user?.role === "ADMIN" && (
          <li><Link to="/admin/events">Admin</Link></li>
        )}


        {!user && (
          <>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </>
        )}

        {user && (
          <>
            <li>
              <Link to="/my-events">Mes inscriptions</Link>
            </li>

            <li>
              <button onClick={logout} className="logout-btn">
                Déconnexion
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
