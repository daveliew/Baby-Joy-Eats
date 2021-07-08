import React from "react";
import IngredientAjax from "../components/Ajax/IngredientAjax";
import DashboardDND from "../components/DND/DashboardDND";
import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <div className="Home">
      <Grid container spacing={2} justify="center">
        <Grid item xs={3} sm={6}>
          <IngredientAjax />
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <DashboardDND />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
