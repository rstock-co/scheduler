import React, { useState, useEffect } from "react";
import updateSpots from "helpers/updaters";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  if (state.days.length > 1) {
    console.log("Initial State: ", state);
  }

  const updateSpots = id => {
    axios
      .get("http://localhost:8001/api/days")
      .then(response => {
        setState(prev => ({ ...prev, days: response.data }));
      })
      .catch(error => console.log(error));
  };

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
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({ ...prev, appointments }));
      })
      .then(() => {
        updateSpots(id);
      });
  };

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
      .delete(`http://localhost:8001/api/appointments/${id}`, {
        interview: appointment,
      })
      .then(() => {
        setState(prev => ({ ...prev, appointments }));
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
