import React from "react";
import { useSocket } from "../../../hooks/useSocket";

interface IDeliverySession {
  id: number;
  user: number;
}

export const DeliverySession = () => {
  const socket = useSocket();
  const [
    deliverySession,
    setDeliverySession
  ] = React.useState<IDeliverySession | null>(null);

  const [vehicle, setVehicle] = React.useState<any | null>(null);

  React.useEffect(() => {
    socket.on(
      "delivery-session-created",
      (deliverySession: IDeliverySession) => {
        setDeliverySession(deliverySession);
      }
    );

    socket.on("cruise-choosed", vehicle => {
      setVehicle(vehicle);
    });
  }, []);

  return (
    <div>
      <h1>This is the delivery session</h1>
      <pre>{JSON.stringify({ deliverySession }, null, 2)}</pre>
      <h1>This is our vehicle</h1>
      <pre>{JSON.stringify(vehicle, null, 2)}</pre>
    </div>
  );
};
