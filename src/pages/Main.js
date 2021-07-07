import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";
import Planner from "./Planner";

const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/info" component={Info} />
        <Route path="/planner" component={Planner} />
      </Switch>
    </main>
  );
};

export default Main;
