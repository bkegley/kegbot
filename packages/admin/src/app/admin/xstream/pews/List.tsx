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
      <div className="flex items-center justify-end w-full mr-12 text-center text-indigo-600">
        <div className="order-1 ml-4">
          <Link className="btn btn-primary" to={`${match.url}/create`}>
            Create New
          </Link>
        </div>
        <div>
          <Link className="btn btn-secondary" to={`${match.url}/suggestions`}>
            Suggestions
          </Link>
        </div>
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {pews.map(pew => {
          return <Pew pew={pew} />;
        })}
      </ul>
    </div>
  );
};
