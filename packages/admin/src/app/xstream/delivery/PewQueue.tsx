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
  const [pewPewed, setPewPewed] = React.useState<IUserPew | null>(null);
  const [pewPewedTimeout, setPewPewedTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const timeoutDelay = 3000;

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

  React.useEffect(() => {
    if (pewPewed) {
      const timeout = setTimeout(() => {
        setPewPewed(null);
      }, 2500);
      setPewPewedTimeout(timeout);
    }

    return () => {
      if (pewPewedTimeout) {
        clearTimeout(pewPewedTimeout);
      }
    };
  }, [pewPewed]);

  return (
    <div>
      <div className="absolute top-0 left-0 w-full mt-10">
        {pewPewed ? (
          <div className="w-1/4 h-20 mx-auto text-center space-y-4">
            <div>
              <span className="text-2xl text-indigo-600">
                {pewPewed.user.username}
              </span>
              <span className="text-lg text-gray-500"> pewed a </span>
              <span className="text-2xl text-indigo-600">
                {pewPewed.pew.name}
              </span>
            </div>
            <div>{pewPewed.pew.description}</div>
          </div>
        ) : null}
      </div>
      <div className="w-1/4 ml-auto">
        <div className="py-4 pl-10 bg-red-300">
          <h1 className="text-3xl tracking-wide text-black uppercase">
            Pew Queue
          </h1>
        </div>
        <AnimatePresence>
          {pews.slice(0, 5).map((pew, index) => {
            return (
              <Pew
                key={pew.uuid}
                pew={pew}
                isActive={index === 0}
                onPewed={pew => {
                  setPews(old => old.slice(1));
                  setPewPewed(pew);
                  pewPew(pew);
                }}
                timeoutDelay={timeoutDelay}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
