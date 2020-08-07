import React from "react";
import { IUserVehicle } from "../../../interfaces";
import { useDeliverySession } from "../../../hooks/useDeliverySession";
import { ChevronLeft, ChevronRight } from "react-feather";
//import { useSocket } from "../../../hooks/useSocket";

export const VehicleSelection = () => {
  //const socket = useSocket();
  const { deliverySession } = useDeliverySession();
  const pageLength = 8;
  const [page, setPage] = React.useState(0);

  const [availableVehicles, setAvailableVehicles] = React.useState<
    IUserVehicle[] | null
  >(null);

  React.useEffect(() => {
    if (deliverySession.user) {
      fetch(
        `http://localhost:4040/users/${deliverySession.user.username}/vehicles`
      )
        .then(res => res.json())
        .then(setAvailableVehicles)
        .catch(console.error);
    }
  }, [deliverySession.user]);

  //React.useEffect(() => {
  //const choosePeruseHandler = () => {
  //setPage(old => old + 1);
  //};
  //socket.on("choose-peruse", choosePeruseHandler);

  //return () => socket.removeListener("choose-peruse", choosePeruseHandler);
  //}, []);

  if (!deliverySession.user || deliverySession.vehicle) return null;

  return (
    <div>
      <h1 className="text-4xl text-center text-indigo-600">
        Choose Your Cruise!
      </h1>
      <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {availableVehicles && !deliverySession.vehicle
          ? availableVehicles
              .slice(pageLength * page, pageLength * page + pageLength)
              .map(vehicle => {
                return (
                  <li className="flex flex-col justify-between overflow-hidden bg-white rounded-lg shadow col-span-1">
                    <div className="w-full p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate leading-5">
                          {vehicle.vehicle.name}
                        </h3>
                        <span className="px-2 py-1 text-blue-900 bg-blue-200 rounded shadow">
                          {vehicle.id}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 space-x-4">
                        <div className="flex flex-col sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 leading-5">
                            Health
                          </dt>
                          <dd className="relative w-full h-full mt-1 text-sm text-gray-900 bg-red-600 leading-5">
                            <div
                              className="absolute top-0 left-0 h-full bg-green-600"
                              style={{
                                width: `${
                                  (vehicle.health /
                                    vehicle.vehicle.baseHealth) *
                                  100
                                }%`
                              }}
                            />
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500 leading-5">
                            Speed
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 leading-5">
                            {vehicle.vehicle.baseHealth}
                          </dd>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
          : null}
      </ul>
      {availableVehicles ? (
        <div className="flex items-center justify-center w-full mx-auto mt-10 text-center">
          {page > 0 ? <ChevronLeft /> : null}
          <div>{page + 1}</div>
          {availableVehicles.length > page * pageLength + pageLength ? (
            <ChevronRight />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
