import React from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import {OrdersList} from './List'

export const OrdersRouter = () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route exact path={match.url}>{() => <OrdersList />}</Route>
    </Switch>
  )
}
