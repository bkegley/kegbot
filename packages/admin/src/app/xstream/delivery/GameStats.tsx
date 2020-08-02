import React from "react";
import { useDeliverySession } from "../../../hooks/useDeliverySession";

export const GameStats = () => {
  const { deliverySession } = useDeliverySession();

  if (!deliverySession?.vehicle) return null;

  return (
    <div>
      <pre>{JSON.stringify(deliverySession, null, 2)}</pre>
    </div>
  );
};
