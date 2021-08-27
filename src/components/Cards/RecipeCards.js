import React, { useContext } from "react";
import { DataContext } from "../App";
// import complexData from "../../data/complexData";
import { Link } from "react-router-dom";

import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "5vh",
        alignItems: "center",
        justifyContent: "center",
    },
    cardGrid: {
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        height: "35vh",
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    btn: {
        marginTop: "1vh",
        color: "#f4a261",
    },
    navItem: {
        color: "#f4a261",
    },
}));

const RecipeCards = (props) => {
    const classes = useStyles();
    const value = useContext(DataContext);
    const { dispatch, ACTIONS } = value;

    // console.log(
    //   `${props.data.map((recipe) => console.log(recipe.id))} from RecipeCards`
    // );

    const maxRecipesShown = 8;

    let recipes = props.data
        .filter((_, index) => index < maxRecipesShown)
        .map((recipe, index) => {
            return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt="food recipe"
                            height="50%"
                            className={classes.cardMedia}
                            image={recipe.image}
                            title={recipe.title}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="subtitle1">
                                {recipe.title}
                            </Typography>
                            <Link to="/info" className={classes.navItem}>
                                <Button
                                    onClick={() =>
                                        dispatch({
                                            type: ACTIONS.ACTIVE_RECIPE,
                                            payload: recipe.id,
                                        })
                                    }
                                >
                                    See Instructions
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h3" color="textPrimary" gutterBottom>
                        Meals for the week
                    </Typography>
                </Grid>
            </Grid>
            <Container className={classes.cardGrid}>
                <Grid container spacing={4} justify="center">
                    {recipes}
                </Grid>
            </Container>
        </Container>
    );
};

export default RecipeCards;
