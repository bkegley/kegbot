import React from "react";
import { Aid } from "./Aid";
import { Link, useRouteMatch } from "react-router-dom";

export const AidList = () => {
  const [aids, setAids] = React.useState([]);

  const match = useRouteMatch();

  React.useEffect(() => {
    fetch("http://localhost:4040/aids")
      .then(res => res.json())
      .then(setAids)
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
        {aids.map(aid => {
          return <Aid aid={aid} />;
        })}
      </ul>
    </div>
  );
};
