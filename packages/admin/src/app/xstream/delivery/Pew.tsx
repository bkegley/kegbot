import React from "react";
import { IUserPew } from "../../../interfaces";
import { motion, Variants } from "framer-motion";

export interface PewProps {
  pew: IUserPew;
  isActive: boolean;
  timeoutDelay: number;
  onPewed(pew: IUserPew): void;
}

const animationVariant: Variants = {
  enter: () => {
    return {
      width: 0
    };
  },
  center: timeoutDelay => {
    return {
      width: "100%",
      transition: {
        duration: timeoutDelay / 1000
      }
    };
  }
};

const pewVariant: Variants = {
  center: () => {
    return {
      scale: 1
    };
  },
  exit: () => {
    return {
      scale: 0,
      transition: {
        duration: 0.2
      }
    };
  }
};

export const Pew = ({ pew, isActive, timeoutDelay, onPewed }: PewProps) => {
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        onPewed(pew);
      }, timeoutDelay);
    }
  }, [isActive]);

  return (
    <motion.div
      key={`${pew.uuid}-1`}
      variants={pewVariant}
      animate="center"
      exit="exit"
      className={`${
        isActive ? "w-5/6 p-4" : "w-1/2 p-2 text-sm"
      } bg-red-300 ml-auto relative`}
    >
      {isActive ? (
        <motion.div
          key={`${pew.uuid}-2`}
          variants={animationVariant}
          initial="enter"
          animate="center"
          custom={timeoutDelay}
          className="absolute top-0 left-0 right-0 h-full bg-green-600"
        />
      ) : null}
      <div className="relative z-10 flex items-center w-full h-full p-2 text-white grid">
        <span>{pew.user.username}</span>
        <span>{pew.pew.name}</span>
      </div>
    </motion.div>
  );
};
