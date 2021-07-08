import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar color="secondary">
      <Toolbar className="nav">
        <Grid container space={2} justify="center">
          <Grid item>
            <Typography variant="h3">Baby Joy EATS</Typography>
          </Grid>
        </Grid>
        <Grid container space={2} justify="center">
          <Grid item>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </Grid>
          <Link to="/planner" className="nav-item">
            Planner
          </Link>
          <Link to="/info" className="nav-item">
            Info
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
