import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Home";
import { CommandRouter } from "./commands";
import { XStreamRouter } from "./xstream";
import { AppLayout } from "../components/AppLayout";

export const App = () => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/">
          {() => <Home />}
        </Route>
        <Route path="/commands">{() => <CommandRouter />}</Route>
        <Route path="/xstream">{() => <XStreamRouter />}</Route>
      </Switch>
    </AppLayout>
  );
};
