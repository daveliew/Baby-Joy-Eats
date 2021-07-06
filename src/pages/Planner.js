import { Grid } from "@material-ui/core";
import React from "react";
import complexData from "../data/complexData";

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
    //! add Grid
    <Grid container>
      <h1>Meals for the week</h1>
      <div className="recipe-grid">{recipes}</div>
    </Grid>
    // <div className="planner">

    // </div>
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
