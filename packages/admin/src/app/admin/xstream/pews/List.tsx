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
    <div className="w-1/2 mx-auto">
      <div className="flex items-center w-full mr-12 text-center text-indigo-600">
        <div className="flex-1 ">
          <Link to={`${match.url}/create`}>Create New</Link>
        </div>
        <div className="flex-1">
          <Link to={`${match.url}/suggestions`}>Suggestions</Link>
        </div>
      </div>
      <div>
        {pews.map(pew => {
          return <Pew pew={pew} />;
        })}
      </div>
    </div>
  );
};
