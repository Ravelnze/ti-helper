import React, { createContext, useContext, useReducer } from "react";

export const Context = createContext();

export const StoreProvider = ({ reducer, initialState, children }) => (
    <Context.Provider
        value={useReducer(reducer, initialState)}
        children={children}
    />
);

export const useStore = () => useContext(Context);
