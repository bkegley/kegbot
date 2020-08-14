import React from "react";
import { useDeliverySession } from "../../../hooks/useDeliverySession";

export const DeliveryRoute = () => {
  const { deliverySession } = useDeliverySession();
  if (!deliverySession) return null;

  const { distance, vehicle } = deliverySession;
  if (!vehicle) return null;

  return (
    <div>
      <p>
        {vehicle.location}/{distance}
      </p>
    </div>
  );
};
