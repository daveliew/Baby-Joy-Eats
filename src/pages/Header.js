import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { logo } from "../Assets/Baby-Joy-Eats.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    // minHeight: 128,
    backgroundColor: "#2A9D8F",
    alignItems: "flex-start",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
  navItem: {
    color: "e9c46a",
    textDecoration: "none",
    textDecorationColor: "#e9c46a",
    alignItems: "flex-end",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Grid container space={2} xs={9}>
            <Grid item xs>
              <Typography variant="h3">
                Baby Joy <span style={{ color: "#e9c46a" }}>EATS</span>
              </Typography>
            </Grid>
          </Grid>
          <Grid container space={2} xs={3}>
            <Grid item xs>
              <Link to="/" className={classes.navItem}>
                <Typography subtitle>Home</Typography>
              </Link>
            </Grid>
            <Grid item xs>
              <Link to="/planner" className={classes.navItem}>
                <Typography subtitle>Planner</Typography>
              </Link>
            </Grid>
            <Grid item xs>
              <Link to="/info" className={classes.navItem}>
                <Typography subtitle>Info</Typography>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

// const Header = () => {
// const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="fixed">
//         <Toolbar className={classes.toolbar}>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h5" noWrap>
//             Baby Joy Eats
//           </Typography>
//           <IconButton aria-label="search" color="inherit">
//             <SearchIcon />
//           </IconButton>
//           <IconButton
//             aria-label="display more actions"
//             edge="end"
//             color="inherit"
//           >
//             <MoreIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };
