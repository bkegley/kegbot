import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { AidList } from "./List";
import { CreateAidForm } from "./CreateForm";
import { UpdateAidForm } from "./UpdateForm";

export const AidsRouter = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url}>
        {() => <AidList />}
      </Route>
      <Route path={`${match.url}/create`}>{() => <CreateAidForm />}</Route>
      <Route path={`${match.url}/:id`}>
        {({ match }) => <UpdateAidForm aidId={match.params.id} />}
      </Route>
    </Switch>
  );
};
