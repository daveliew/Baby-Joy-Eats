import React from "react";
import complexData from "../data/complexData";
import { Grid, Typography, Button } from "@material-ui/core";

const Planner = () => {
  const maxRecipesShown = 6;
  let recipes = complexData.results
    .filter((_, index) => index <= maxRecipesShown)
    .map((recipe, index) => {
      return (
        <div className="recipe-card" key={index}>
          <img
            className="food-image"
            src={recipe.image}
            alt={recipe.title}
          ></img>
          <p>{recipe.title}</p>
        </div>
      );
    });

  return (
    <>
      <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
        Meals for the week
      </Typography>
      <Button variant="contained" color="primary" disableElevation>
        Disable elevation
      </Button>
      <Grid container spacing={2} justify="center">
        <Grid item>{recipes}</Grid>
      </Grid>
    </>
  );
};

export default Planner;

// let recipes = recipesArr.map((recipe, index) => {
//   return (
//     <div className="recipe-card" key={index}>
//       <img src={recipe.image} alt={recipe.title}></img>
//       <h3>{recipe.title}</h3>

//       {/* <p>{recipe.missedIngredients}</p> */}
//     </div>
//   );
// });
