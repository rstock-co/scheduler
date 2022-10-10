import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_DAYS = "SET_DAYS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

/**
 * The reducer function for the 'useReducer' hook that specifies how the state gets updated
 * @param {object} state The application's current state
 * @param {object} action The action performed by the user.
 * @returns the next state, via a function execution.  Returns error message if action type is not valid.
 */

const reducer = (state, action) => {
  const reducers = {
    SET_DAY: state => ({ ...state, day: action.day }),
    SET_DAYS: state => ({ ...state, days: action.days }),
    SET_APPLICATION_DATA: state => ({
      ...state,
      days: action.days,
      appointments: action.appointments,
      interviewers: action.interviewers,
    }),
    SET_INTERVIEW: state => ({ ...state, appointments: action.appointments }),
    default: () =>
      console.log(`Error: the ${action.type} action type is not valid`),
  };
  return reducers[action.type](state) || reducers.default();
};

/**
 * Custom 'useApplicationData' hook to manage the application's state
 */

const useApplicationData = () => {
  // set and manage state with useReducer hook
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  console.log("STATE:", state);

  /**
   * Initialize application data via useEffect hook which runs only once, making calls to 3 different api's
   * Then dispatches the data to update the application state via useReducer hook
   */

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  /**
   * Helper function to update the state by setting the number of spots for a given day
   */

  const setDay = day => dispatch({ type: SET_DAY, day });

  const updateSpots = id => {
    axios
      .get("/api/days")
      .then(response => {
        dispatch({ type: SET_DAYS, days: response.data });
      })
      .catch(error => console.log(error));
  };

  /**
   * Books an interview upon user submitting the form
   * @param {integer} id the appointment id for the appointment being booked
   * @param {object} interview the interview data
   * @returns an axios put call to update appointments with new interview, then update state, then update spots
   */

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          appointments,
        });
      })
      .then(() => {
        updateSpots(id);
      });
  };

  /**
   * Cancels an interview upon user clicking the cancel button
   * @param {integer} id the appointment id for the appointment being cancelled
   * @returns an axios delete call to delete the selected interview, then update state, then update spots
   */

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, {
        interview: appointment,
      })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          appointments,
        });
      })
      .then(() => {
        updateSpots(id);
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
