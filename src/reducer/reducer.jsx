// Moved reducer logic to it's own folder and file
const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      const { day } = action;
      return {...state, day};

    case SET_APPLICATION_DATA:
      const { days, appointments, interviewers } = action;
      return {...state, days, appointments, interviewers};

    case SET_INTERVIEW: {
      const { days, appointments } = action;
      return {...state, days, appointments};
    }
    default: 
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export {
  reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
};