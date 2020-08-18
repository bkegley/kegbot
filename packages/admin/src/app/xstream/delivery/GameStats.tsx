import React from "react";
import { useDeliverySession } from "../../../hooks/useDeliverySession";
import { IDeliverySession } from "../../../interfaces";
import {
  IState,
  GameWinType,
  GameOverType
} from "../../../hooks/DeliverySessionProvider";

export const GameStats = () => {
  const { deliverySession } = useDeliverySession();

  if (!deliverySession?.vehicle && !deliverySession.sessionResult) return null;

  const { vehicle, gameTime, user, sessionResult } = deliverySession;

  if (sessionResult) {
    return <GameResults deliverySession={deliverySession} />;
  }

  const seconds = Math.floor((gameTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  const minutes = Math.floor(gameTime / 60000);

  return (
    <div>
      <li className="flex flex-col justify-between overflow-hidden bg-white rounded-lg shadow col-span-1">
        <div className="w-full p-6">
          <div className="w-full text-6xl text-center">
            {minutes}:{seconds}
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate leading-5">
              {user.username} is driving {vehicle.name}
            </h3>
          </div>
          <div className="mt-4 grid grid-cols-3 space-x-4">
            <div className="flex flex-col sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 leading-5">
                Health
              </dt>

              <div className="flex flex-col">
                <dd className="relative w-full h-6 mt-1 text-sm text-gray-900 bg-red-600 leading-5">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-600"
                    style={{
                      width: `${(vehicle.health / vehicle.baseHealth) * 100}%`
                    }}
                  />
                </dd>
                <div className="flex justify-between text-sm text-gray-700">
                  <p>{vehicle.health}</p>
                  <p>/</p>
                  <p>{vehicle.baseHealth}</p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 leading-5">
                Speed
              </dt>
              <dd className="mt-1 text-sm text-gray-900 leading-5">
                {vehicle.speed}
              </dd>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

interface GameResultsProps {
  deliverySession: IState;
}
const GameResults = ({ deliverySession }: GameResultsProps) => {
  const { sessionResult, user, vehicle } = deliverySession;
  let text: string;

  switch (sessionResult) {
    case GameOverType.TIMEOUT: {
      text = `${user.username} ran out of time!`;
      break;
    }

    case GameOverType.VEHICLE_DESTROYED: {
      text = `${user.username}'s ${vehicle.name} was destroyed!`;
      break;
    }

    case GameWinType.SUCCESS: {
      text = `${user.username} won the game!`;
      break;
    }
  }
  return <div className="p-6 bg-white rounded shadow">{text}</div>;
};
