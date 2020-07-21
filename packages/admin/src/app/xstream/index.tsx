import React from "react";
import { Switch, Route } from "react-router-dom";
import { Phone } from "./phone";
import { DeliverySession } from "./delivery";

export const XStreamRouter = () => {
  return (
    <Switch>
      <Route path="/xstream/phone">{() => <Phone />}</Route>
      <Route path="/xstream/delivery">{() => <DeliverySession />}</Route>
    </Switch>
  );
};
