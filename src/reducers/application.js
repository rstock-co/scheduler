export const SET_DAY = "SET_DAY";
export const SET_DAYS = "SET_DAYS";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

/**
 * The reducer function from the 'useReducer' hook, specifies the actions (functions to execute) to update the state object
 * @param {object} state The application's current state
 * @param {object} action The action performed by the user
 * @returns the next state, OR returns an error message if the given action type isn't valid
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
    default: "tried to reduce with unsupported action type",
  };

  if (reducers[action.type]) return reducers[action.type](state);
  return reducers.default;
};

export default reducer;
