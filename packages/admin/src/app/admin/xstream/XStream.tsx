import React from "react";
import { useRouteMatch } from "react-router-dom";
import { StyledLink } from "../../../components/StyledLink";

export const XStream = () => {
  const match = useRouteMatch();
  return (
    <div>
      <h1 className="text-3xl tracking-wide text-indigo-600 uppercase">
        XStream
      </h1>
      <div>
        <StyledLink to={`${match.url}/aids`}>Aids</StyledLink>
      </div>
      <div>
        <StyledLink to={`${match.url}/vehicles`}>Vehicles</StyledLink>
      </div>
      <div>
        <StyledLink to={`${match.url}/pews`}>Pews</StyledLink>
      </div>
      <div>
        <StyledLink to={`${match.url}/orders`}>Orders</StyledLink>
      </div>
      <div>
        <StyledLink to={`${match.url}/game`}>Game</StyledLink>
      </div>
    </div>
  );
};
