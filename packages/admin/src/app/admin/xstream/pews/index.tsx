import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { PewList } from "./List";
import { PewSuggestionList } from "./PewSuggestionList";
import { CreatePew } from "./CreatePew";

export const PewsRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <PewList />}
      </Route>
      <Route path={`${match.url}/suggestions`}>
        {() => <PewSuggestionList />}
      </Route>
      <Route path={`${match.url}/create`}>{() => <CreatePew />}</Route>
    </Switch>
  );
};
