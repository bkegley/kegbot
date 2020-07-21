import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { AdminRouter } from "./admin";
import { XStreamRouter } from "./xstream";

export const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        {() => <Home />}
      </Route>
      <Route path="/admin">{() => <AdminRouter />}</Route>
      <Route path="/xstream">{() => <XStreamRouter />}</Route>
    </Switch>
  );
};
