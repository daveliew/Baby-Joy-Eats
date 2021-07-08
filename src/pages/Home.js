import React from "react";
import IngredientAjax from "../components/Ajax/IngredientAjax";
import DashboardDND from "../components/DND/DashboardDND";
import { Container, Grid } from "@material-ui/core";

const Home = () => {
  return (
    <div className="Home">
      <Container spacing={2} justify="center">
        <Grid
          container
          spacing={2}
          justify="center"
          style={{ marginTop: `100px` }}
        >
          <Grid item xs={3} sm={6}>
            <IngredientAjax />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
          <Grid item xs={3} sm={6} md={12}>
            <DashboardDND />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
