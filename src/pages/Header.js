import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar>
      <Toolbar className="nav">
        <h1>Baby Joy EATS</h1>
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/planner" className="nav-item">
          Planner
        </Link>
        <Link to="/info" className="nav-item">
          Info
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
