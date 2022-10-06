import React, { useState, useEffect } from "react";
import { DayList, Appointment } from "../components";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";

import "./Application.scss";

const Application = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log("daily appts: ", dailyAppointments);
  return (
    <>
      <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList days={state.days} value={state.day} onChange={setDay} />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
        <section className="schedule">
          {dailyAppointments.map(appointment => (
            <Appointment key={appointment.id} {...appointment} />
          ))}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
    </>
  );
};

export default Application;
