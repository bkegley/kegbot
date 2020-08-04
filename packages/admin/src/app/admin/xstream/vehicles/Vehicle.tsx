import React from "react";
import { IVehicle } from "../../../../interfaces";
import { useRouteMatch, Link } from "react-router-dom";

export interface VehicleProps {
  vehicle: IVehicle;
}

export const Vehicle = ({ vehicle }: VehicleProps) => {
  const match = useRouteMatch();
  return (
    <li className="flex flex-col justify-between overflow-hidden bg-white rounded-lg shadow col-span-1">
      <div className="w-full p-6">
        <h3 className="text-sm font-medium text-gray-900 truncate leading-5">
          {vehicle.name}
        </h3>
        <div className="mt-4 grid grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Cost
            </dt>
            <dd className="mt-1 text-sm text-gray-900 leading-5">
              {vehicle.cost}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Base Speed
            </dt>
            <dd className="mt-1 text-sm text-gray-900 leading-5">
              {vehicle.baseSpeed}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Base Health
            </dt>
            <dd className="mt-1 text-sm text-gray-900 leading-5">
              {vehicle.baseHealth}
            </dd>
          </div>
        </div>
      </div>
      <Link to={`${match.url}/${vehicle.id}`}>
        <div className="flex w-full py-2 overflow-hidden bg-gray-200">
          <p className="w-full text-center">Edit</p>
        </div>
      </Link>
    </li>
  );
};
