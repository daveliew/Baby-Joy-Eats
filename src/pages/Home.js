import React from "react";
import Ajax from "../components/Ajax/Ajax";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Joy's Meal Planner</h1>
      <h3>Let's get started!</h3>
      <Ajax />
    </div>
  );
};

export default Home;
