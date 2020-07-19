import React from "react";
import { useSocket } from "../../../hooks/useSocket";
import { Phone as PhoneIcon, PhoneCall } from "react-feather";

export const Phone = () => {
  const socket = useSocket();
  const [isRinging, setIsRinging] = React.useState(false);

  React.useEffect(() => {
    socket.on("phone-ringing", (bool: boolean) => {
      setIsRinging(bool);
    });
  });
  return (
    <div className={`${isRinging ? "text-red-600" : "text-black"} h-10 w-10`}>
      {isRinging ? <PhoneCall /> : <PhoneIcon />}
    </div>
  );
};
