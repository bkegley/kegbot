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
  VEHICLE_SELECTED = "VEHICLE_SELECTED",
  PEW_PEWED = "PEW_PEWED"
}

interface IAction {
  type: ActionType;
  payload: any;
}

interface IState {
  id: number;
  isActive: boolean;
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
    case ActionType.DELIVERY_SESSION_CREATED: {
      return {
        ...state,
        id: action.payload.id,
        user: action.payload.user
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
  isActive: false,
  user: null,
  vehicle: null
};

export const DeliverySessionProvider = ({
  children
}: DeliverySessionProviderProps) => {
  const socket = useSocket();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const deliverySessionCreatedHandler = (
      deliverySession: IDeliverySession
    ) => {
      dispatch({
        type: ActionType.DELIVERY_SESSION_CREATED,
        payload: {
          id: deliverySession.id,
          user: deliverySession.user
        }
      });
    };
    socket.on("delivery-session-created", deliverySessionCreatedHandler);

    const cruiseChoosedHandler = (userVehicle: IUserVehicle) => {
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
  }, []);

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
