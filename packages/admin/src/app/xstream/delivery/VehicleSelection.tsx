import React from "react";
import { IUserVehicle } from "../../../interfaces";
import { useDeliverySession } from "../../../hooks/useDeliverySession";

export const VehicleSelection = () => {
  const { deliverySession } = useDeliverySession();

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

  console.log({ deliverySession });

  if (!deliverySession.user || deliverySession.vehicle) return null;

  return (
    <div>
      <h1>This is our vehicle selection</h1>
      {deliverySession.vehicle ? (
        <div>
          <h1>
            {deliverySession.user.username} selected{" "}
            {deliverySession.vehicle.vehicle.name}
          </h1>
        </div>
      ) : null}
      {availableVehicles && !deliverySession.vehicle
        ? availableVehicles.map(vehicle => {
            return (
              <div>
                <h1>{vehicle.vehicle.name}</h1>
                <p>{vehicle.health}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};
