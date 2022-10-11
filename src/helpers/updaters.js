const updateSpots = (state, appointments) => {
  const days = state.days;
  const day = days.filter(day => day.name === state.day)[0];
  const apptIDs = day.appointments;
  let spots = apptIDs.length;

  console.log(
    "(3) inside updateSpots fn: apptID's: ",
    apptIDs,
    " spots: ",
    spots
  );

  apptIDs.forEach(id => {
    if (appointments[id].interview) spots--;
    if (!appointments[id].interview) console.log(`${id} doesn't exist`);
  });

  const updatedDay = { ...day, spots };

  const updatedDays = days.map((element, index) => {
    if (index === day.id - 1) {
      console.log("(inside updateSpots fn): Replacing day with: ", updatedDay);
      return updatedDay;
    }
    return element;
  });

  return updatedDays;
};

export default updateSpots;
