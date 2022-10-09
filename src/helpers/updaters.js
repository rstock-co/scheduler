const apptList = {
  1: {
    id: 1,
    time: "12pm",
    interview: {
      student: "Archie Cohen",
      interviewer: 6,
    },
  },
  2: {
    id: 2,
    time: "1pm",
    interview: {
      student: "Chad Takahashi",
      interviewer: 6,
    },
  },
  3: {
    id: 3,
    time: "2pm",
    interview: null,
  },
  4: {
    id: 4,
    time: "3pm",
    interview: null,
  },
  5: {
    id: 5,
    time: "4pm",
    interview: {
      student: "Richard Stock",
      interviewer: 5,
    },
  },
  6: {
    id: 6,
    time: "12pm",
    interview: null,
  },
  7: {
    id: 7,
    time: "1pm",
    interview: null,
  },
  8: {
    id: 8,
    time: "2pm",
    interview: null,
  },
  9: {
    id: 9,
    time: "3pm",
    interview: null,
  },
  10: {
    id: 10,
    time: "4pm",
    interview: null,
  },
  11: {
    id: 11,
    time: "12pm",
    interview: {
      student: "Jamal Jordan",
      interviewer: 6,
    },
  },
  12: {
    id: 12,
    time: "1pm",
    interview: null,
  },
  13: {
    id: 13,
    time: "2pm",
    interview: null,
  },
  14: {
    id: 14,
    time: "3pm",
    interview: null,
  },
  15: {
    id: 15,
    time: "4pm",
    interview: {
      student: "Leopold Silvers",
      interviewer: 6,
    },
  },
  16: {
    id: 16,
    time: "12pm",
    interview: {
      student: "Liam Martinez",
      interviewer: 3,
    },
  },
  17: {
    id: 17,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: 3,
    },
  },
  18: {
    id: 18,
    time: "2pm",
    interview: {
      student: "Maria Boucher",
      interviewer: 7,
    },
  },
  19: {
    id: 19,
    time: "3pm",
    interview: null,
  },
  20: {
    id: 20,
    time: "4pm",
    interview: {
      student: "Michael Chan-Montoya",
      interviewer: 9,
    },
  },
  21: {
    id: 21,
    time: "12pm",
    interview: {
      student: "Richard Wong",
      interviewer: 10,
    },
  },
  22: {
    id: 22,
    time: "1pm",
    interview: {
      student: "Yuko Smith",
      interviewer: 1,
    },
  },
  23: {
    id: 23,
    time: "2pm",
    interview: {
      student: "Trudy Jones",
      interviewer: 7,
    },
  },
  24: {
    id: 24,
    time: "3pm",
    interview: null,
  },
  25: {
    id: 25,
    time: "4pm",
    interview: null,
  },
};

const updateSpots = appointmentsList => {
  const spots = {
    Monday: 5,
    Tuesday: 5,
    Wednesday: 5,
    Thursday: 5,
    Friday: 5,
  };

  const allAppointments = Object.values(appointmentsList).filter(
    appt => appt.interview !== null
  );

  allAppointments.forEach(appt => {
    if (appt.id > 0 && appt.id <= 5) spots.Monday--;
    if (appt.id > 5 && appt.id <= 10) spots.Tuesday--;
    if (appt.id > 10 && appt.id <= 15) spots.Wednesday--;
    if (appt.id > 15 && appt.id <= 20) spots.Thursday--;
    if (appt.id > 20 && appt.id <= 25) spots.Friday--;
  });

  return spots;
};

export default updateSpots;

console.log(updateSpots(apptList));
