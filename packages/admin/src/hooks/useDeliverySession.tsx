import React from "react";
import { DeliverySessionContext } from "./DeliverySessionProvider";

export const useDeliverySession = () => {
  const context = React.useContext(DeliverySessionContext);
  if (!context) {
    throw new Error(
      "useDeliverySession must be wrapped in a DeliverySessionProvider"
    );
  }
  return context;
};
