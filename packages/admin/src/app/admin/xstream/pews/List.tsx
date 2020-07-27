import React from "react";
import { Pew } from "./Pew";
import { Link, useRouteMatch } from "react-router-dom";

export const PewList = () => {
  const [pews, setPews] = React.useState([]);

  const match = useRouteMatch();

  React.useEffect(() => {
    fetch("http://localhost:4040/pews")
      .then(res => res.json())
      .then(setPews)
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="w-full mr-12 text-right text-indigo-600">
        <Link to={`${match.url}/create`}>Create New</Link>
      </div>
      {pews.map(pew => {
        return <Pew pew={pew} />;
      })}
    </div>
  );
};
