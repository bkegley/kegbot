import React from "react";
import { IUserPew } from "../../../interfaces";

export interface PewProps {
  pew: IUserPew;
  isActive: boolean;
  timeoutDelay: number;
  onPewed(pew: IUserPew): void;
}

export const Pew = ({ pew, isActive, timeoutDelay, onPewed }: PewProps) => {
  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        onPewed(pew);
      }, timeoutDelay);
    }
  }, [isActive]);

  return (
    <div className="p-6 bg-red-500">
      <span>{pew.user.username}</span>
      <span>{pew.pew.name}</span>
    </div>
  );
};
