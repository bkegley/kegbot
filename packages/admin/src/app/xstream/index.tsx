import React from "react";
import { Switch, Route } from "react-router-dom";
import { Phone } from "./phone";
import { DeliverySession } from "./delivery";
import { VehicleRouter } from "./vehicles";
import { Pew } from "./pew";

export const XStreamRouter = () => {
  return (
    <Switch>
      <Route exact path="/xstream">
        {() => <div>placeholder</div>}
      </Route>
      <Route path="/xstream/phone">{() => <Phone />}</Route>
      <Route path="/xstream/delivery">{() => <DeliverySession />}</Route>
      <Route path="/xstream/vehicles">{() => <VehicleRouter />}</Route>
      <Route path="/xstream/pew">{() => <Pew />}</Route>
    </Switch>
  );
};
