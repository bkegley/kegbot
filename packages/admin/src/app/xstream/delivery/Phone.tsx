import React from "react";
import { useSocket } from "../../../hooks/useSocket";
import { Phone as PhoneIcon, PhoneCall } from "react-feather";

export const Phone = () => {
  const socket = useSocket();
  const [isRinging, setIsRinging] = React.useState(false);

  React.useEffect(() => {
    const handlePhoneRinging = (bool: boolean) => {
      setIsRinging(bool);
    };
    socket.on("phone-ringing", handlePhoneRinging);

    return () => {
      socket.removeListener("phone-ringing", handlePhoneRinging);
    };
  }, []);

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
