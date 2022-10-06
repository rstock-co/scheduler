export const getAppointmentsForDay = (state, day) => {
  const days = state.days;
  const matchedDay = days.filter(d => d.name === day);

  if (days.length === 0 || matchedDay.length === 0) return [];

  const apptIDs = matchedDay[0].appointments;
  const appts = apptIDs.map(appt => state.appointments[appt]);
  return appts;
};

export const getInterview = (state, interview) => {
  if (!interview) return null;
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
};
