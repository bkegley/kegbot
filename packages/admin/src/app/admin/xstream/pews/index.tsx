import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { PewList } from "./List";

export const PewsRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <PewList />}
      </Route>
    </Switch>
  );
};
