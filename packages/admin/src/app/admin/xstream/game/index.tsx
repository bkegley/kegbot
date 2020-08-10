import React from "react";
import { Game } from "./Game";
import { CreateGame } from "./CreateGame";
import { UpdateGame } from "./UpdateGame";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export const GameRouter = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <Game />}
      </Route>
      <Route path={`${match.url}/create`}>
        {props => <CreateGame {...props} />}
      </Route>
      <Route path={`${match.url}/update`}>
        {props => <UpdateGame {...props} />}
      </Route>
    </Switch>
  );
};
