import { useEffect, useReducer } from "react";
import axios from "axios";
import updateSpots from "helpers/updaters";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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
   * Updates the appointments list with the new interview object when either
   * the 'bookInterview' or 'cancelInterview' functions make an AJAX request
   * @param {integer} id
   * @param {object} interview
   * @returns nothing; updates state via dispatching new appointments and updated number of spots
   */

  const updateAppointments = (id, interview) => {
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
  };

  /**
   * Books & cancels interviews when user submits the form or clicks delete button
   * @param {integer} id the appointment id for the appointment being booked
   * @param {object} interview the interview data
   * @returns an axios put call to update appointments with new interview, then update state, then update spots
   */

  const bookInterview = (id, interview) => {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => updateAppointments(id, interview));
  };

  const cancelInterview = id =>
    axios.delete(`/api/appointments/${id}`).then(() => updateAppointments(id));

  /**
   * Updates the day when user clicks on DayListItem
   */

  const setDay = day => dispatch({ type: SET_DAY, day });

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
