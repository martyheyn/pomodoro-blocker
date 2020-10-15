import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
// import axios from 'axios';

// const intial state
const initialState = {
  websites: [],
  running: false,
  time: { minutes: 25, seconds: 0 },
};

// Create Global Context
export const GlobalContext = createContext(initialState);

// Provider context
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function addWebsite(website) {
    dispatch({
      type: 'ADD_WEBSITE',
      payload: website,
    });
  }

  function deleteWebsite(id) {
    dispatch({
      type: 'DELETE_WEBSITE',
      payload: id,
    });
  }

  // Return stuff
  return (
    <GlobalContext.Provider
      value={{
        websites: state.websites,
        running: state.running,
        time: state.time,
        addWebsite,
        deleteWebsite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
