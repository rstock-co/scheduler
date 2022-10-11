import { useEffect, useReducer, useCallback } from "react";
import axios from "axios";
import updateSpots from "helpers/updaters";

/**
 * The reducer function from the 'useReducer' hook, specifies the actions (functions to execute) to update the state object
 * @param {object} state The application's current state
 * @param {object} action The action performed by the user
 * @returns the next state, OR returns an error message if the given action type isn't valid
 */

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = (state, action) => {
  const reducers = {
    SET_DAY: state => ({ ...state, day: action.day }),
    SET_APPLICATION_DATA: state => ({
      ...state,
      days: action.days,
      appointments: action.appointments,
      interviewers: action.interviewers,
    }),
    SET_INTERVIEW: state => ({
      ...state,
      appointments: action.appointments,
      days: action.days,
    }),
    default: () =>
      console.log(`Error: the ${action.type} action type is not valid`),
  };

  return reducers[action.type](state) || reducers.default();
};

/**
 * useApplicationData (custom React hook)
 * @returns object containing state, setDay, bookInterview, cancelInterview
 */

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  /**
   * Updates state (appointments list) with the new interview object
   * when either the bookInterview or cancelInterview functions make an AJAX request
   * Triggered by web socket (server message)
   */

  const updateAppointments = useCallback(
    (id, interview) => {
      const int = interview ? { ...interview } : null;
      const appointment = {
        ...state.appointments[id],
        interview: int,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        days: updateSpots(state, appointments),
      });
    },
    [state]
  );

  /**
   * Initializes application data via useEffect hook which runs only once, making calls to 3 different api's
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
   * Web Socket Implementation
   * Initializes a new web socket, and an event listener
   * When a message is recieved from server after db update,
   * calls the updateAppointments function to update state
   */

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8001"); // add environment variable
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.type === "SET_INTERVIEW") {
        updateAppointments(data.id, data.interview);
      }
    };
    return () => socket.close();
  }, [updateAppointments]);

  /**
   * Updates the day when user clicks on DayListItem
   */

  const setDay = day => dispatch({ type: SET_DAY, day });

  /**
   * Books or cancels an interview when user submits the form or clicks garbage icon
   * @param {integer} id the appointment id for the appointment being booked or cancelled
   * @param {object} interview the interview data
   * @returns an axios call to update appointments via put or delete call
   */

  const bookInterview = (id, interview) =>
    axios.put(`/api/appointments/${id}`, { interview });

  const cancelInterview = id => axios.delete(`/api/appointments/${id}`);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};
export default useApplicationData;
