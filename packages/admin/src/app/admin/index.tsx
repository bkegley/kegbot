import React from "react";
import { Switch, Route } from "react-router-dom";
import { AppLayout } from "../../components/index";
import { CommandRouter } from "./commands";
import { XStreamAdminRouter } from "./xstream";
import { AdminHome } from "./Home";

export const AdminRouter = () => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path="/admin">
          <AdminHome />
        </Route>
        <Route path="/admin/commands">{() => <CommandRouter />}</Route>
        <Route path="/admin/xstream">{() => <XStreamAdminRouter />}</Route>
      </Switch>
    </AppLayout>
  );
};
