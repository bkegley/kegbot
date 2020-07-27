import React from "react";
import { useSocket } from "../../../hooks/useSocket";
import { Pew } from "./Pew";
import { IUserPew } from "../../../interfaces";

export const PewQueue = () => {
  const socket = useSocket();
  const [pews, setPews] = React.useState<IUserPew[]>([]);
  const timeoutDelay = 2000;

  React.useEffect(() => {
    let isCurrent = true;
    const pewPewedHandler = (pew: IUserPew) => {
      if (!isCurrent) return;
      const newData = pews.concat(pew);
      setPews(newData);
    };

    socket.on("pewpew-pewed", pewPewedHandler);

    return () => {
      isCurrent = false;
      socket.removeListener("pewpew-pewed", pewPewedHandler);
    };
  }, [pews]);

  return (
    <div className="bg-red-300">
      <div>
        <h1>Active Pew</h1>
        {pews.length ? (
          <>
            <div className="flex items-center text-green-900 space-x-4">
              {pews[0].user.username}
            </div>
            <div>{pews[0].pew.name}</div>
          </>
        ) : (
          <div>There is no active pew </div>
        )}
      </div>
      <h1>This is our pew page</h1>
      {pews.map((pew, index) => {
        return (
          <Pew
            key={pew.uuid}
            pew={pew}
            isActive={index === 0}
            onPewed={pewedPew => {
              setPews(old => old.slice(1));
            }}
            timeoutDelay={timeoutDelay}
          />
        );
      })}
    </div>
  );
};
