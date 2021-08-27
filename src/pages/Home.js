import React from "react";
import IngredientAjax from "../components/Ajax/IngredientAjax";
import DashboardDND from "../components/DND/DashboardDND";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#f4a261",
        padding: "0.5rem",
        flexGrow: 1,
        width: "100vw",
        height: "100vh",
    },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container spacing={2} justify="center" direction="rows">
                <IngredientAjax />
                <DashboardDND />
            </Container>
        </div>
    );
};

export default Home;
