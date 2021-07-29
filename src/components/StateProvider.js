import React, { createContext, useReducer, useContext } from 'react'

// Need Context API
// 1. To track basket
// 2. To Track user

// repairs the dataLayer  - This is Data layer
export const StateContext = createContext();

// It Wraps our app and provides the data layer to all components
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull info from data layer
export const useStateValue = () => useContext(StateContext);
