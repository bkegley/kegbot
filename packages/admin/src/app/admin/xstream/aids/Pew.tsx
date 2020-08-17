import React from "react";
import { IAid } from "../../../../interfaces";
import { useRouteMatch, Link } from "react-router-dom";

export interface AidProps {
  aid: IAid;
}

export const Aid = ({ aid }: AidProps) => {
  const match = useRouteMatch();
  return (
    <li className="flex flex-col justify-between overflow-hidden bg-white rounded-lg shadow col-span-1">
      <div className="w-full p-6">
        <h3 className="text-sm font-medium text-gray-900 truncate leading-5">
          {aid.name}
        </h3>
        <span className="px-2 py-px text-xs font-medium text-green-900 bg-green-300 rounded-full leading-4">
          {aid.expendable ? "One-Time" : "Infinite"}
        </span>
        <div className="mt-4 grid grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Cost
            </dt>
            <dd className="mt-1 text-sm text-gray-900 leading-5">{aid.cost}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Health Modification
            </dt>
            <dd className="mt-1 text-sm text-gray-900 leading-5">
              {aid.healthModification}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Speed Modification
            </dt>
            <dd className="mt-1 text-sm text-gray-900 leading-5">
              {aid.speedModification}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 leading-5">
              Speed Timeout
            </dt>
            <dd className="mt-1 text-sm text-gray-900 leading-5">
              {aid.speedModificationTimeout}
            </dd>
          </div>
        </div>
      </div>
      <Link to={`${match.url}/${aid.id}`}>
        <div className="flex w-full py-2 overflow-hidden bg-gray-200">
          <p className="w-full text-center">Edit</p>
        </div>
      </Link>
    </li>
  );
};
