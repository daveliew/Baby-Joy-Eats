import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar>
      <Toolbar className="nav">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/planner" className="nav-item">
          Planner
        </Link>
        <Link to="/info" className="nav-item">
          Info
        </Link>
        <Link to="/test" className="nav-item">
          Test
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
