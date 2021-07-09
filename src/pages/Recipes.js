import React from "react";
import complexData from "../data/complexData";
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
  grid: {
    flexGrow: 1,
  },
  btn: {
    marginTop: "1vh",
  },
}));

const handleClick = () => {};

const Recipes = () => {
  const classes = useStyles();
  const maxRecipesShown = 8;
  let recipes = complexData.results
    .filter((_, index) => index < maxRecipesShown)
    .map((recipe, index) => {
      return (
        <Grid item xs={12} sm={3} key={index}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              alt="food recipe"
              height="200"
              className={classes.cardMedia}
              image={recipe.image}
              title={recipe.title}
            />
            <CardContent className={classes.CardContent}>
              <Typography gutterBottom title variant="h5">
                {recipe.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });

  return (
    <Container className={classes.root}>
      <Grid container xs={12}>
        <Grid container xs={6} sm={3}></Grid>
        <Grid container xs={12} sm={6} direction="row">
          <Grid item xs={12} sm={9}>
            <Typography variant="h3" color="textPrimary" gutterBottom>
              Meals for the week
            </Typography>
          </Grid>
          <Grid item xs={3} sm={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleClick}
            >
              Fetch Recipes
            </Button>
          </Grid>
        </Grid>
        <Grid container xs={6} sm={3}></Grid>
        <Container className={classes.cardGrid}>
          <Grid container spacing={4} justify="center">
            {recipes}
          </Grid>
        </Container>
      </Grid>
    </Container>
  );
};

export default Recipes;

// let recipes = recipesArr.map((recipe, index) => {
//   return (
//     <div className="recipe-card" key={index}>
//       <img src={recipe.image} alt={recipe.title}></img>
//       <h3>{recipe.title}</h3>

//       {/* <p>{recipe.missedIngredients}</p> */}
//     </div>
//   );
// });
