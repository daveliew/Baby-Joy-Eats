import React from "react";
import IngredientAjax from "../components/Ajax/IngredientAjax";
import DashboardDND from "../components/DND/DashboardDND";

const Home = () => {
  return (
    <div className="Home">
      <h1>Welcome to Joy's Meal Planner v2</h1>
      <IngredientAjax />
      {/* <div className="dashboard"> */}
      <DashboardDND />
      {/* </div> */}
    </div>
  );
};

export default Home;
