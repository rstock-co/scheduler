export const getAppointmentsForDay = (state, day) => {
  const days = state.days;
  const matchedDay = days.filter(d => d.name === day);
  if (days.length === 0 || matchedDay.length === 0) return [];

  const apptIDs = matchedDay[0].appointments;
  const appts = Object.values(state.appointments).filter(appt =>
    apptIDs.includes(appt.id)
  );

  return appts;
};

export const getInterview = (state, interview) => {
  if (!interview) return null;
  const result = { ...interview };
  result.interviewer = Object.values(state.interviewers).filter(
    i => interview.interviewer === i.id
  )[0];
  return result;
};
