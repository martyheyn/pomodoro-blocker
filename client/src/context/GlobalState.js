import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// const intial state
const initialState = {
  timer: [],
  websites: [],
  running: false,
  work: true,
  error: null,
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

  function setWork() {
    dispatch({
      type: 'SET_WORK',
    });
  }

  function setBreak() {
    dispatch({
      type: 'SET_BREAK',
    });
  }

  function stopRunning() {
    dispatch({
      type: 'STOP_RUNNING',
    });
  }

  // Add a timer connected to backend
  async function addTimer(timer) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/timer', timer, config);

      dispatch({
        type: 'ADD_TIMER',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TIMER_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Stop the timer and unblock sites
  async function stopTimer(id) {
    try {
      await axios.delete(`/api/timer/${id}`);

      dispatch({
        type: 'STOP_TIMER',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'TIMER_ERROR',
        payload: err.response.data.error,
      });
    }
  };

    // Stop the timer and unblock sites
    async function unblock() {
      try {
        await axios.delete(`/api/timer`);
  
        dispatch({
          type: 'UNBLOCK',
        });
      } catch (err) {
        dispatch({
          type: 'TIMER_ERROR',
          payload: err.response.data.error,
        });
      }
    }

  // Return stuff
  return (
    <GlobalContext.Provider
      value={{
        timer: state.timer,
        websites: state.websites,
        running: state.running,
        work: state.work,
        error: state.error,
        addWebsite,
        deleteWebsite,
        addTimer,
        stopTimer,
        setWork,
        setBreak,
        stopRunning,
        unblock,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
