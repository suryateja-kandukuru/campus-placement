import jwtDecode from "jwt-decode";
import { decode } from "punycode";
import React, { createContext, Dispatch, useReducer } from "react";

type Action = { type: string; payload: any };

type AppContextValue = {
  state: State;
  dispatch: Dispatch<Action>;
};

type State = {
  toast: any;
  auth: any;
  role: string;
  id: string;
};

const initialState: State = {
  toast: null,
  auth: null,
  role: "",
  id: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_AUTH": {
      const decoded: any = jwtDecode(action.payload);
      return {
        ...state,
        auth: action.payload,
        role: decoded.role,
        id: decoded.id,
      };
    }
    case "SetToastRef": {
      return { ...state, toast: action.payload };
    }
    default:
      return state;
  }
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue: AppContextValue = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider, AppContextValue };
