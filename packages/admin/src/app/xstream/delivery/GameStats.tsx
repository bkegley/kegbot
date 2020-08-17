import React from "react";
import { useDeliverySession } from "../../../hooks/useDeliverySession";

export const GameStats = () => {
  const { deliverySession } = useDeliverySession();

  if (!deliverySession?.vehicle) return null;
  const { vehicle, gameTime, user } = deliverySession;

  const seconds = Math.floor((gameTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const minutes = Math.floor(gameTime / 60000);

  return (
    <div>
      <li className="flex flex-col justify-between overflow-hidden bg-white rounded-lg shadow col-span-1">
        <div className="w-full p-6">
          <div>
            {minutes}:{seconds}
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate leading-5">
              {user.username} is driving {vehicle.name}
            </h3>
          </div>
          <div className="mt-4 grid grid-cols-2 space-x-4">
            <div className="flex flex-col sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 leading-5">
                Health
              </dt>
              <p>{vehicle.health}</p>
              <dd className="relative w-full h-full mt-1 text-sm text-gray-900 bg-red-600 leading-5">
                <div
                  className="absolute top-0 left-0 h-full bg-green-600"
                  style={{
                    width: `${(vehicle.health / vehicle.baseHealth) * 100}%`
                  }}
                />
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 leading-5">
                Speed
              </dt>
              <dd className="mt-1 text-sm text-gray-900 leading-5">
                {vehicle.speed}
              </dd>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};
