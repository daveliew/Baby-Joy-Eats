import React from "react";
import IngredientsDND from "../components/DND/IngredientsDND";
import PlannerDND from "../components/DND/PlannerDND";

const Test = () => {
  return (
    <div className="Test">
      <h1>Welcome to Joy's Meal Planner</h1>
      <h3>Hello from Test</h3>
      <div className="dashboard">
        <IngredientsDND />
        <PlannerDND />
      </div>
    </div>
  );
};

export default Test;
