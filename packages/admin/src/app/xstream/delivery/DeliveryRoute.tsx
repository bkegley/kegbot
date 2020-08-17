import React from "react";
import { useDeliverySession } from "../../../hooks/useDeliverySession";

export const DeliveryRoute = () => {
  const { deliverySession } = useDeliverySession();
  if (!deliverySession) return null;

  const { distance, vehicle } = deliverySession;
  if (!vehicle) return null;

  return (
    <div>
      <p className="relative w-3/4 h-10 bg-gray-900">
        <div
          className="absolute top-0 left-0 h-full bg-indigo-600"
          style={{ width: (vehicle.location / distance) * 100 }}
        />
      </p>
    </div>
  );
};
