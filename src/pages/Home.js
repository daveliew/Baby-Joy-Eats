import React from "react";
import IngredientAjax from "../components/Ajax/IngredientAjax";
import DashboardDND from "../components/DND/DashboardDND";

const Home = () => {
  return (
    <div className="Home">
      <IngredientAjax />
      <DashboardDND />
    </div>
  );
};

export default Home;
