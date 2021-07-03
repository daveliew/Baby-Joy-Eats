import React from "react";
import IngredientsDND from "../components/DND/IngredientsDND";
import PlannerDND from "../components/DND/PlannerDND";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Joy's Meal Planner</h1>
      <h3>Let's get started!</h3>
      <div className="dashboard">
        <IngredientsDND />
        <PlannerDND />
      </div>
    </div>
  );
};

export default Home;
