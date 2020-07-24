import React from "react";
import { useSocket } from "../../../hooks/useSocket";
import { IDeliverySession, IUserVehicle } from "../../../interfaces";

export const VehicleSelection = () => {
  const socket = useSocket();
  const [
    deliverySession,
    setDeliverySession
  ] = React.useState<IDeliverySession | null>(null);

  const [vehicles, setVehicles] = React.useState<IUserVehicle[] | null>(null);
  console.log({ vehicles });

  React.useEffect(() => {
    socket.on(
      "delivery-session-created",
      (deliverySession: IDeliverySession) => {
        setDeliverySession(deliverySession);
      }
    );
  }, []);

  React.useEffect(() => {
    if (deliverySession) {
      fetch(
        `http://localhost:4040/users/${deliverySession.user.username}/vehicles`
      )
        .then(res => res.json())
        .then(setVehicles)
        .catch(console.error);
    }
  }, [deliverySession]);

  return (
    <div>
      <h1>This is our vehicle selection</h1>
      {vehicles?.map(vehicle => {
        return (
          <div>
            <h1>{vehicle.vehicle.name}</h1>
            <p>{vehicle.health}</p>
          </div>
        );
      })}
    </div>
  );
};
