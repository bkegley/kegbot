import React from "react";
import { Switch, Route } from "react-router-dom";
import { CommandRouter } from "./commands";
import { XStreamRouter } from "./xstream";

export const App = () => {
  return (
    <Switch>
      <Route path="/commands">{() => <CommandRouter />}</Route>
      <Route path="/xstream">{() => <XStreamRouter />}</Route>
    </Switch>
  );
};
