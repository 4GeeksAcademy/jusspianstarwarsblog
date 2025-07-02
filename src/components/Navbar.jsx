import React, { useContext } from "react";
import { Context } from "../store";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light px-5">
      <Link to="/">
       <img className="logo"
     src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG9.png"
     alt="Star Wars Logo"
    style={{ height: "50px" }}
     />
     </Link>
      <div className="dropdown">
        <button className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
          Favorites ({store.favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.map((fav, index) => (
            <li key={index} className="dropdown-item d-flex justify-content-between">
              {fav}
              <button className="btn btn-sm btn-danger" onClick={() => actions.removeFavorite(fav)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;