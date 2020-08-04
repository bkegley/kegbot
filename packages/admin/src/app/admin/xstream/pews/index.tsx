import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { PewList } from "./List";
import { PewSuggestionList } from "./PewSuggestionList";
import { CreatePewForm } from "./CreateForm";
import { UpdatePewForm } from "./UpdateForm";

export const PewsRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <PewList />}
      </Route>
      <Route path={`${match.url}/create`}>{() => <CreatePewForm />}</Route>
      <Route path={`${match.url}/suggestions`}>
        {() => <PewSuggestionList />}
      </Route>
      <Route path={`${match.url}/:id`}>
        {({ match }) => <UpdatePewForm pewId={match.params.id} />}
      </Route>
    </Switch>
  );
};
