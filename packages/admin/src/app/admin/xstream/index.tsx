import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { VehicleRouter } from "./vehicles";
import { XStream } from "./XStream";

export const XStreamAdminRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path="/admin/xstream">
        {() => <XStream />}
      </Route>
      <Route path={`${match.url}/vehicles`}>{() => <VehicleRouter />}</Route>
    </Switch>
  );
};
