import React from "react";
import { useSocket } from "../../../hooks/useSocket";
import { Pew } from "./Pew";
import { IUserPew } from "../../../interfaces";
import { AnimatePresence } from "framer-motion";
import { useDeliverySession } from "../../../hooks/useDeliverySession";

export const PewQueue = () => {
  const socket = useSocket();
  const { pewPew } = useDeliverySession();
  const [pews, setPews] = React.useState<IUserPew[]>([]);
  const timeoutDelay = 5000;

  React.useEffect(() => {
    let isCurrent = true;
    const pewPewedHandler = (pew: IUserPew) => {
      if (!isCurrent) return;
      const newData = pews.concat(pew);
      setPews(newData);
    };

    socket.on("pewpew-queued", pewPewedHandler);

    return () => {
      isCurrent = false;
      socket.removeListener("pewpew-queued", pewPewedHandler);
    };
  }, [pews]);

  return (
    <div>
      <div className="py-4 pl-10 bg-red-300">
        <h1 className="text-3xl tracking-wide text-black uppercase">
          Pew Queue
        </h1>
      </div>
      <AnimatePresence>
        {pews.slice(0, 2).map((pew, index) => {
          return (
            <Pew
              key={pew.uuid}
              pew={pew}
              isActive={index === 0}
              onPewed={pew => {
                setPews(old => old.slice(1));
                pewPew(pew);
              }}
              timeoutDelay={timeoutDelay}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};
