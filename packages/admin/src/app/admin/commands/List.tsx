import React from "react";
import { Page } from "../../../components/Page";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Command } from "./Command";
import { ICommand } from "../../../interfaces/ICommand";

enum FetchCommandActionTypes {
  FETCH_INIT = "FETCH_INIT",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR"
}

enum CommandEventActionTypes {
  COMMAND_CREATED = "COMMAND_CREATED",
  COMMAND_DELETED = "COMMAND_DELETED",
  COMMAND_UPDATED = "COMMAND_UPDATED"
}

interface CommandAction<T = any> {
  type: FetchCommandActionTypes | CommandEventActionTypes;
  payload?: T;
}

interface CommandState {
  loading: boolean;
  error: any;
  data: ICommand[] | null;
}

const initialState: CommandState = {
  loading: false,
  error: null,
  data: null
};

const reducer = (state: CommandState, action: CommandAction) => {
  switch (action.type) {
    case FetchCommandActionTypes.FETCH_INIT: {
      return {
        loading: true,
        error: null,
        data: null
      };
    }
    case FetchCommandActionTypes.FETCH_SUCCESS: {
      return {
        loading: false,
        error: null,
        data: action.payload
      };
    }
    case FetchCommandActionTypes.FETCH_ERROR: {
      return {
        loading: false,
        error: action.payload,
        data: null
      };
    }
    case CommandEventActionTypes.COMMAND_CREATED: {
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    }
    case CommandEventActionTypes.COMMAND_UPDATED: {
      return {
        ...state,
        data: state.data.map(command =>
          command.id.toString() === action.payload.id ? action.payload : command
        )
      };
    }
    case CommandEventActionTypes.COMMAND_DELETED: {
      return {
        ...state,
        data: state.data.filter(
          command => command.id.toString() !== action.payload
        )
      };
    }
    default: {
      return state;
    }
  }
};

export const CommandList = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const [state, dispatch] = React.useReducer<
    React.Reducer<CommandState, CommandAction>
  >(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: FetchCommandActionTypes.FETCH_INIT });
    fetch("http://localhost:4040/commands")
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: FetchCommandActionTypes.FETCH_SUCCESS,
          payload: res
        });
      })
      .catch(err => {
        dispatch({ type: FetchCommandActionTypes.FETCH_ERROR, payload: err });
      });
  }, []);

  return (
    <Page
      title="Commands"
      primaryAction={{
        text: "Create New",
        onClick: () => history.push(`${match.url}/create`)
      }}
    >
      {!state.data ? (
        <div>
          <p>Looks like there isn't data yet...</p>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {state.data.map(command => (
            <Command command={command} />
          ))}
        </ul>
      )}
    </Page>
  );
};
