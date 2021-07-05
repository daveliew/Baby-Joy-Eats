import React from "react";
import IngredientAjax from "../components/Ajax/IngredientAjax";
import DashboardDND from "../components/DND/DashboardDND";
import IngredientForm from "../components/IngredientForm";

const Home = () => {
  return (
    <div className="Home">
      <h1>Welcome to Joy's Meal Planner v2</h1>
      <h3>Fetch Ingredients from API</h3>
      <IngredientAjax />
      <hr />
      <IngredientForm />
      <div className="dashboard">
        <DashboardDND />
      </div>
    </div>
  );
};

export default Home;
