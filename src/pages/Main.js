import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";
import Planner from "./Planner";
import Test from "./Test";

const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/info" component={Info} />
        {/* <Route path="/receipes/:ingredient" component={Recipes} /> */}
        <Route path="/planner" component={Planner} />
        <Route path="/test" component={Test} />
      </Switch>
    </main>
  );
};

export default Main;
