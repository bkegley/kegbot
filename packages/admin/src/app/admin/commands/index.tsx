import React from "react";
import { Switch, Route } from "react-router-dom";
import { CommandList } from "./List";
import { CreateNewPage } from "./CreateNewPage";

export const CommandRouter = () => {
  return (
    <Switch>
      <Route exact path="/admin/commands">
        {() => <CommandList />}
      </Route>
      <Route path="/admin/commands/create">{() => <CreateNewPage />}</Route>
    </Switch>
  );
};
