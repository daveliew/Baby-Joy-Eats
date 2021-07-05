import React from "react";
import complexData from "../data/complexData";
// import recipesArr from "../data/recipesData";

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
    <div className="planner">
      <h1>Hello from Planner</h1>
      <h3>Meals for the week</h3>
      <div className="recipe-grid">{recipes}</div>
    </div>
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
