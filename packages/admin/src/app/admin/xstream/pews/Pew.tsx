import React from "react";
import { IPew } from "../../../../interfaces";
import { useRouteMatch, Link } from "react-router-dom";

export interface PewProps {
  pew: IPew;
}

export const Pew = ({ pew }: PewProps) => {
  const match = useRouteMatch();
  return (
    <div className="w-1/4 my-6">
      <h3 className="text-lg tracking-wide text-indigo-600 uppercase">
        <Link to={`${match.url}/${pew.id}`}>{pew.name}</Link>
      </h3>
      <p>{pew.cost}</p>
      <p>{pew.expendable ? "One Time" : "Infinite"}</p>
    </div>
  );
};
