import React from "react";
import { Switch, Route } from "react-router-dom";
import { CommandList } from "./List";
import { CreateNewPage } from "./CreateNewPage";

export const CommandRouter = () => {
  return (
    <Switch>
      <Route exact path="/commands">
        {() => <CommandList />}
      </Route>
      <Route path="/commands/create">{() => <CreateNewPage />}</Route>
    </Switch>
  );
};
