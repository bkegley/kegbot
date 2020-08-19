import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useSocket } from "../../../hooks/useSocket";
import { IUserAid } from "../../../interfaces";

const variants: Variants = {
  initial: () => {
    return {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    };
  },
  center: () => {
    return {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    };
  },
  exit: () => {
    return {
      x: -50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
        duration: 0.2
      }
    };
  }
};

export const AidPlayed = () => {
  const socket = useSocket();
  const [aid, setAid] = React.useState<IUserAid | null>(null);
  const [aidTimeout, setAidTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  React.useEffect(() => {
    const aidPlayedHandler = (aid: IUserAid) => {
      setAid(aid);
      setAidTimeout(
        setTimeout(() => {
          setAid(null);
        }, 3000)
      );
    };
    socket.on("aid-played", aidPlayedHandler);

    return () => {
      if (aidTimeout) {
        clearTimeout(aidTimeout);
      }
      socket.removeListener("aid-played", aidPlayedHandler);
    };
  }, []);

  return (
    <AnimatePresence>
      {aid ? (
        <motion.div
          variants={variants}
          initial="initial"
          animate="center"
          exit="exit"
        >
          <div className="w-full h-20 mx-auto text-center space-y-4">
            <div>
              <span className="text-2xl text-indigo-600">
                {aid.user.username}
              </span>
              <span className="text-lg text-gray-500"> played a </span>
              <span className="text-2xl text-indigo-600">{aid.aid.name}</span>
            </div>
            <div>{aid.aid.description}</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
