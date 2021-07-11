import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";
import Recipes from "./Recipes";

const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/info" component={Info} />
        <Route path="/recipes" component={Recipes} />
        <Redirect path="/" component={Home} />
      </Switch>
    </main>
  );
};

export default Main;
