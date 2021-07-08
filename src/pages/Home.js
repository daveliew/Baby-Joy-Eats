import React from "react";
import IngredientAjax from "../components/Ajax/IngredientAjax";
import DashboardDND from "../components/DND/DashboardDND";
import { Container } from "@material-ui/core";

const Home = () => {
  return (
    <div className="Home">
      <Container spacing={2} justify="center" direction="rows">
        <IngredientAjax />
        <DashboardDND />
      </Container>
    </div>
  );
};

export default Home;
