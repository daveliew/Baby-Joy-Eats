import React from "react";
import recipesArr from "../data/recipesData";

const Planner = () => {
  let recipes = recipesArr.map((recipe) => {
    return (
      <div className="recipe-card">
        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title}></img>
        {/* <p>{recipe.missedIngredients}</p> */}
      </div>
    );
  });
  return (
    <div className="planner">
      <h1>Hello from Planner</h1>
      <h3>Meals for the week</h3>
      {recipes}
    </div>
  );
};

export default Planner;
