import React from "react";
import { Vehicle } from "./Vehicle";
import { Link, useRouteMatch } from "react-router-dom";
import { IVehicle } from "../../../../interfaces";

export const VehicleList = () => {
  const match = useRouteMatch();
  const [vehicles, setVehicles] = React.useState<IVehicle[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:4040/xstream/vehicles")
      .then(res => res.json())
      .then(res => setVehicles(res))
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
      </div>
      <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map(vehicle => {
          return <Vehicle vehicle={vehicle} />;
        })}
      </ul>
    </div>
  );
};
