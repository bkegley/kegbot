import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { CreateVehiclePage } from "./CreatePage";
import { VehicleList } from "./List";
import { UpdateVehiclePage } from "./UpdatePage";

export const VehicleRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <VehicleList />}
      </Route>
      <Route path={`${match.url}/create`}>{() => <CreateVehiclePage />}</Route>
      <Route path={`${match.url}/:id`}>
        {({ match }) => <UpdateVehiclePage id={match.params.id} />}
      </Route>
    </Switch>
  );
};
