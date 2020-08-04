import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { CreateVehicleForm } from "./CreateForm";
import { VehicleList } from "./List";
import { UpdateVehicleForm } from "./UpdateForm";

export const VehicleRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <VehicleList />}
      </Route>
      <Route path={`${match.url}/create`}>{() => <CreateVehicleForm />}</Route>
      <Route path={`${match.url}/:id`}>
        {({ match }) => <UpdateVehicleForm vehicleId={match.params.id} />}
      </Route>
    </Switch>
  );
};
