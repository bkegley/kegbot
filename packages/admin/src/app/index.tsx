import React from "react";
import { Switch, Route } from "react-router-dom";
import { CommandRouter } from "./commands";

export const App = () => {
  return (
    <Switch>
      <Route path="/commands">{() => <CommandRouter />}</Route>
    </Switch>
  );
};
