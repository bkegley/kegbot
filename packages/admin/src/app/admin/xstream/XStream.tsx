import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export const XStream = () => {
  const match = useRouteMatch();
  return (
    <div>
      <h1>XStream</h1>
      <div>
        <Link to={`${match.url}/vehicles`}>Vehicles</Link>
      </div>
      <div>
        <Link to={`${match.url}/pews`}>Pews</Link>
      </div>
      <div>
        <Link to={`${match.url}/orders`}>Orders</Link>
      </div>
    </div>
  );
};
