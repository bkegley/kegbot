import React from "react";
import { IUserVehicle, IUser, IDeliverySession, IUserPew } from "../interfaces";
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

enum ActionType {
  DELIVERY_SESSION_CREATED = "DELIVERY_SESSION_CREATED",
  GAME_TICK = "GAME_TICK",
  GAME_START = "GAME_START",
  GAME_END = "GAME_END",
  VEHICLE_SELECTED = "VEHICLE_SELECTED",
  PEW_PEWED = "PEW_PEWED"
}

enum GameEndType {
  TIMEOUT = "TIMEOUT",
  VEHICLE_DESTROYED = "VEHICLE_DESTROYED"
}

interface IAction {
  type: ActionType;
  payload: any;
}

interface IState {
  id: number;
  isActive: boolean;
  duration: number;
  gameTime: number;
  reward: number;
  user: IUser;
  vehicle: {
    id: number;
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
        gameTime: state.gameTime - action.payload
      };
    }

    case ActionType.GAME_START: {
      return {
        ...state,
        isActive: true
      };
    }

    case ActionType.GAME_END: {
      return {
        ...state,
        isActive: false
      };
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
          health: state.vehicle.health - 10
        }
      };
    }
  }
};

const initialState: IState = {
  id: null,
  gameTime: null,
  duration: null,
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

  console.log({ gameTime: state.gameTime });

  React.useEffect(() => {
    if (state.isActive) {
      setGameTimerTimeout(
        setInterval(() => {
          dispatch({ type: ActionType.GAME_TICK, payload: gameTick });
        }, gameTick)
      );
    }
    if (!state.isActive && gameTimerTimeout) {
      clearTimeout(gameTimerTimeout);
    }
  }, [state.isActive]);

  React.useEffect(() => {
    if (state.gameTime < 0) {
      dispatch({ type: ActionType.GAME_END, payload: GameEndType.TIMEOUT });
    }
  }, [state.gameTime]);

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
          speed: userVehicle.vehicle.baseSpeed
        }
      });
    };
    socket.on("cruise-choosed", cruiseChoosedHandler);

    return () => {
      socket.removeListener(
        "delivery-session-created",
        deliverySessionCreatedHandler
      );
      socket.removeListener("cruise-choosed", cruiseChoosedHandler);
    };
  }, []);

  console.log({ state });

  const value = React.useMemo(() => {
    return {
      deliverySession: state,
      pewPew: (pew: IUserPew) => {
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
