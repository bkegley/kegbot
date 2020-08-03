import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { VehicleRouter } from "./vehicles";
import { XStream } from "./XStream";
import { PewsRouter } from "./pews";
import { Game } from "./game";

export const XStreamAdminRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <XStream />}
      </Route>
      <Route path={`${match.url}/vehicles`}>{() => <VehicleRouter />}</Route>
      <Route path={`${match.url}/pews`}>{() => <PewsRouter />}</Route>
      <Route path={`${match.url}/game`}>{() => <Game />}</Route>
    </Switch>
  );
};
