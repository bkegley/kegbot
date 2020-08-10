import React from "react";
import { Switch, Route } from "react-router-dom";
import { XStreamDelivery } from "./delivery";

export const XStreamRouter = () => {
  return (
    <Switch>
      <Route path="/xstream/delivery">{() => <XStreamDelivery />}</Route>
    </Switch>
  );
};
