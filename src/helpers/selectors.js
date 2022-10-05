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
