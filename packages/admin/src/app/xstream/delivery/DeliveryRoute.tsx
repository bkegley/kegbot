import React from "react";
import { useDeliverySession } from "../../../hooks/useDeliverySession";

export const DeliveryRoute = () => {
  const { deliverySession } = useDeliverySession();
  if (!deliverySession || deliverySession.sessionResult) return null;

  const { distance, vehicle } = deliverySession;
  if (!vehicle) return null;

  return (
    <div className="w-3/4">
      <p className="relative w-full h-10 bg-gray-900">
        <div
          className="absolute top-0 left-0 h-full bg-indigo-600 transition-width ease-linear duration-1000"
          style={{ width: `${(vehicle.location / distance) * 100}%` }}
        />
      </p>
      <p>
        {vehicle.location} / {distance}
      </p>
    </div>
  );
};
