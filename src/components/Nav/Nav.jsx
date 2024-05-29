import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav-container">
      {" "}
      {/* Agrega la clase al contenedor principal */}
      <div className="nav-header">
        <h1 className="text-movie">Movie Library</h1>
      </div>
      <div className="nav-links">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/01">
          Exercise01
        </Link>
        <Link className="link" to="/02">
          Exercise02
        </Link>
      </div>
    </div>
  );
};

export default Nav;
