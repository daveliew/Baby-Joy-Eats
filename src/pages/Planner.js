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
import useStyles from "../styles/styles";

// let recipes = recipesArr.map((recipe, index) => {
//   return (
//     <div className="recipe-card" key={index}>
//       <img src={recipe.image} alt={recipe.title}></img>
//       <h3>{recipe.title}</h3>

//       {/* <p>{recipe.missedIngredients}</p> */}
//     </div>
//   );
// });

const Planner = () => {
  const classes = useStyles();
  const maxRecipesShown = 6;
  let recipes = complexData.results
    .filter((_, index) => index <= maxRecipesShown)
    .map((recipe, index) => {
      return (
        <Grid item key={index}>
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
              <Typography gutterBottom variant="h5">
                {recipe.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });

  return (
    <>
      <Container>
        <Typography
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Meals for the week
        </Typography>
        {/* <Button variant="contained" color="primary" disableElevation>
          Disable elevation
        </Button> */}
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4} justify="center">
          {recipes}
        </Grid>
      </Container>
    </>
  );
};

export default Planner;
