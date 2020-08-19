import React from "react";
import { DeliverySessionProvider } from "../../../hooks/DeliverySessionProvider";
import { DeliveryRoute } from "./DeliveryRoute";
import { GameStats } from "./GameStats";
import { VehicleSelection } from "./VehicleSelection";
import { PewQueue } from "./PewQueue";
import { PewClue } from "./PewClue";
import { Phone } from "./Phone";
import { AidPlayed } from "./AidPlayed";

export const XStreamDelivery = () => {
  return (
    <DeliverySessionProvider>
      <div className="absolute top-0 left-0 m-10">
        <Phone />
      </div>
      <div className="absolute top-0 left-0 mt-40">
        <PewClue />
      </div>
      <div className="absolute top-0 w-full left">
        <PewQueue />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <GameStats />
        <VehicleSelection />
      </div>
      <div className="absolute bottom-0 left-0 pb-40 pl-20">
        <AidPlayed />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-32 pb-10">
        <DeliveryRoute />
      </div>
    </DeliverySessionProvider>
  );
};
