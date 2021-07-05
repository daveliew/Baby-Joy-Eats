import React from "react";
import DashboardDND from "../components/DND/DashboardDND";

const Home = () => {
  return (
    <div className="Home">
      <h1>Welcome to Joy's Meal Planner v2</h1>
      <h3>Fetch Ingredients from API</h3>
      <div className="dashboard">
        <DashboardDND />
      </div>
    </div>
  );
};

export default Home;
