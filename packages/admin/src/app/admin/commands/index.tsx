import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { CommandList } from "./List";
import { CommandUpdatePage } from "./UpdatePage";
import { CommandCreatePage } from "./CreatePage";

export const CommandRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <CommandList />}
      </Route>
      <Route path={`${match.url}/create`}>
        {props => <CommandCreatePage {...props} />}
      </Route>
      <Route path={`${match.url}/:id`}>
        {({ match }) => <CommandUpdatePage commandId={match.params.id} />}
      </Route>
    </Switch>
  );
};
