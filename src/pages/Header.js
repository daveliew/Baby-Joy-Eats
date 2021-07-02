import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav">
      <div className="nav-item">
        <span className="nav-logo">
          <Link to="/">Home</Link>
        </span>
      </div>
      <div className="nav-item">
        <Link to="/planner">Planner</Link>
      </div>
      <div className="nav-item">
        <Link to="/info">Info</Link>
      </div>
    </div>
  );
};

export default Header;
