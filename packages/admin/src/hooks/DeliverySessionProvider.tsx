import React from "react";
import {
  IUserVehicle,
  IUser,
  IDeliverySession,
  IUserPew,
  IUserAid
} from "../interfaces";
import { useSocket } from "./useSocket";

export interface IDeliverySessionContext {
  deliverySession?: IState;
  pewPew: (pew: IUserPew) => void;
}

export const DeliverySessionContext = React.createContext<
  IDeliverySessionContext | undefined
>(undefined);

interface DeliverySessionProviderProps {
  children: React.ReactNode;
}

type IAction =
  | {
      type: ActionType.DELIVERY_SESSION_CREATED;
      payload: Pick<
        IDeliverySession,
        "id" | "reward" | "duration" | "user" | "distance"
      >;
    }
  | { type: ActionType.GAME_TICK; payload: number }
  | { type: ActionType.GAME_START }
  | { type: ActionType.GAME_OVER; payload: GameOverType }
  | { type: ActionType.GAME_WIN; payload: GameWinType }
  | {
      type: ActionType.VEHICLE_SELECTED;
      payload: {
        id: number;
        name: string;
        baseHealth: number;
        health: number;
        speed: number;
        location: number;
      };
    }
  | { type: ActionType.PEW_PEWED; payload: IUserPew }
  | { type: ActionType.SPEED_RESTORED; payload: number }
  | { type: ActionType.AID_PLAYED; payload: IUserAid };

enum ActionType {
  DELIVERY_SESSION_CREATED = "DELIVERY_SESSION_CREATED",
  GAME_TICK = "GAME_TICK",
  GAME_START = "GAME_START",
  GAME_OVER = "GAME_OVER",
  GAME_WIN = "GAME_WIN",
  VEHICLE_SELECTED = "VEHICLE_SELECTED",
  PEW_PEWED = "PEW_PEWED",
  SPEED_RESTORED = "SPEED_RESTORED",
  AID_PLAYED = "AID_PLAYED"
}

enum GameOverType {
  TIMEOUT = "TIMEOUT",
  VEHICLE_DESTROYED = "VEHICLE_DESTROYED"
}

enum GameWinType {
  SUCCESS = "SUCCESS"
}

interface IState {
  id: number;
  isActive: boolean;
  duration: number;
  distance: number;
  gameTime: number;
  reward: number;
  user: IUser;
  vehicle: {
    id: number;
    location: number;
    name: string;
    baseHealth: number;
    health: number;
    speed: number;
  };
}

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.GAME_TICK: {
      return {
        ...state,
        gameTime: state.gameTime - action.payload,
        vehicle: {
          ...state.vehicle,
          location: state.vehicle.location + state.vehicle.speed
        }
      };
    }

    case ActionType.GAME_START: {
      return {
        ...state,
        isActive: true
      };
    }

    case ActionType.GAME_OVER: {
      return initialState;
    }

    case ActionType.GAME_WIN: {
      return initialState;
    }

    case ActionType.DELIVERY_SESSION_CREATED: {
      return {
        ...state,
        ...action.payload,
        gameTime: action.payload.duration
      };
    }

    case ActionType.VEHICLE_SELECTED: {
      return {
        ...state,
        vehicle: action.payload
      };
    }

    case ActionType.PEW_PEWED: {
      if (!state.vehicle) {
        return state;
      }

      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          health:
            state.vehicle.health - action.payload.pew.healthModification || 0,
          speed: state.vehicle.speed - action.payload.pew.speedModification || 0
        }
      };
    }
    case ActionType.SPEED_RESTORED: {
      if (!state.vehicle) {
        return state;
      }

      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          speed: state.vehicle.speed + action.payload
        }
      };
    }
    case ActionType.AID_PLAYED: {
      if (!state.vehicle) {
        return state;
      }

      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          speed:
            state.vehicle.speed + action.payload.aid.speedModification ?? 0,
          health:
            state.vehicle.health + action.payload.aid.healthModification ?? 0
        }
      };
    }
    default: {
      return state;
    }
  }
};

const initialState: IState = {
  id: null,
  gameTime: null,
  duration: null,
  distance: null,
  reward: null,
  isActive: false,
  user: null,
  vehicle: null
};

const gameTick = 1000;

export const DeliverySessionProvider = ({
  children
}: DeliverySessionProviderProps) => {
  const socket = useSocket();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [gameTimerTimeout, setGameTimerTimeout] = React.useState<ReturnType<
    typeof setInterval
  > | null>(null);

  React.useEffect(() => {
    if (state.isActive) {
      setGameTimerTimeout(
        setInterval(() => {
          dispatch({ type: ActionType.GAME_TICK, payload: gameTick });
        }, gameTick)
      );
    }

    if (!state.isActive && gameTimerTimeout) {
      clearInterval(gameTimerTimeout);
    }

    return () => clearInterval(gameTimerTimeout);
  }, [state.isActive]);

  // Handle game win
  React.useEffect(() => {
    if (state.vehicle?.location > state.distance) {
      socket.emit("game-won", {
        deliverySessionId: state.id,
        vehicleId: state.vehicle.id,
        vehicleHealth: state.vehicle.health,
        username: state.user.username,
        reward: state.reward
      });
      dispatch({ type: ActionType.GAME_WIN, payload: GameWinType.SUCCESS });
    }
  }, [state.vehicle?.location, state.distance]);

  // Handle game over
  React.useEffect(() => {
    if (state.gameTime < 0) {
      socket.emit("game-over", {
        deliverySessionId: state.id,
        vehicleId: state.vehicle.id,
        vehicleHealth: state.vehicle.health,
        username: state.user.username,
        reward: state.reward
      });
      dispatch({ type: ActionType.GAME_OVER, payload: GameOverType.TIMEOUT });
    }
  }, [state.gameTime]);

  React.useEffect(() => {
    if (state.vehicle?.health <= 0) {
      socket.emit("game-over", {
        deliverySessionId: state.id,
        vehicleId: state.vehicle.id,
        vehicleHealth: state.vehicle.health
      });
      dispatch({
        type: ActionType.GAME_OVER,
        payload: GameOverType.VEHICLE_DESTROYED
      });
    }
  }, [state.vehicle?.health]);

  React.useEffect(() => {
    const deliverySessionCreatedHandler = (
      deliverySession: IDeliverySession
    ) => {
      dispatch({
        type: ActionType.DELIVERY_SESSION_CREATED,
        payload: {
          id: deliverySession.id,
          reward: deliverySession.reward,
          duration: deliverySession.duration,
          distance: deliverySession.distance,
          user: deliverySession.user
        }
      });
    };
    socket.on("delivery-session-created", deliverySessionCreatedHandler);

    const cruiseChoosedHandler = (userVehicle: IUserVehicle) => {
      dispatch({ type: ActionType.GAME_START, payload: null });
      dispatch({
        type: ActionType.VEHICLE_SELECTED,
        payload: {
          id: userVehicle.id,
          name: userVehicle.vehicle.name,
          baseHealth: userVehicle.vehicle.baseHealth,
          health: userVehicle.health,
          speed: userVehicle.vehicle.baseSpeed,
          location: 0
        }
      });
    };
    socket.on("cruise-choosed", cruiseChoosedHandler);

    const gameStoppedHandler = () => {
      dispatch({ type: ActionType.GAME_OVER, payload: null });
    };

    socket.on("game-stopped", gameStoppedHandler);

    const aidPlayedHandler = (aid: IUserAid) => {
      dispatch({ type: ActionType.AID_PLAYED, payload: aid });
    };

    socket.on("aid-played", aidPlayedHandler);

    return () => {
      socket.removeListener(
        "delivery-session-created",
        deliverySessionCreatedHandler
      );
      socket.removeListener("cruise-choosed", cruiseChoosedHandler);
      socket.removeListener("game-stopped", gameStoppedHandler);
      socket.removeListener("aid-played", aidPlayedHandler);
    };
  }, []);

  const value = React.useMemo(() => {
    return {
      deliverySession: state,
      pewPew: (pew: IUserPew) => {
        if (pew.pew.speedModificationTimeout) {
          setTimeout(() => {
            dispatch({
              type: ActionType.SPEED_RESTORED,
              payload: pew.pew.speedModification
            });
          }, pew.pew.speedModificationTimeout * gameTick);
        }
        dispatch({ type: ActionType.PEW_PEWED, payload: pew });
      }
    };
  }, [state]);

  return (
    <DeliverySessionContext.Provider value={value}>
      {children}
    </DeliverySessionContext.Provider>
  );
};
