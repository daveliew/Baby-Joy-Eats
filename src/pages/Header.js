import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        backgroundColor: "#2A9D8F",
        alignItems: "flex-start",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    title: {
        textDecoration: "none",
        textDecorationColor: "#e9c46a",
    },
    navItem: {
        color: "e9c46a",
        textDecoration: "none",
        textDecorationColor: "#e9c46a",
        alignItems: "flex-end",
        marginTop: "1rem",
    },
}));

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Grid container space={2}>
                        <Grid item xs={8} sm={10} className={classes.title}>
                            <Typography variant="h4">
                                Baby Joy{" "}
                                <Link to="/" className={classes.navItem}>
                                    <span style={{ color: "#e9c46a" }}>
                                        EATS
                                    </span>
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                            <Link to="/recipes" className={classes.navItem}>
                                <Typography subtitle>Recipes</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={2} sm={1}>
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
