import React from "react";
import { useSocket } from "../../../hooks/useSocket";
import { Phone as PhoneIcon, PhoneCall } from "react-feather";

export const Phone = () => {
  const socket = useSocket();
  const [isRinging, setIsRinging] = React.useState(false);
  const [deliverySession, setDeliverySession] = React.useState<null | any>(
    null
  );

  React.useEffect(() => {
    socket.on("phone-ringing", (bool: boolean) => {
      setIsRinging(bool);
    });

    socket.on("delivery-session-created", deliverySession => {
      setDeliverySession(deliverySession);
    });

    socket.on("delivery-session-finished", () => {
      setDeliverySession(null);
    });
  });

  return (
    <div className="flex">
      <div className={`${isRinging ? "text-red-600" : "text-black"}`}>
        {isRinging ? (
          <PhoneCall className="w-12 h-12" />
        ) : (
          <PhoneIcon className="w-12 h-12" />
        )}
      </div>
    </div>
  );
};
