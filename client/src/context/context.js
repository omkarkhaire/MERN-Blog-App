import React, { createContext, useReducer, useEffect } from "react";
import Reducer from "./reducer";

const initial_state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const context = React.createContext(initial_state);
//after we declare createcontext
//we get two functions or we can say two features
//provider
//consmer

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initial_state);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </context.Provider>
  );
};
