import { useEffect, useReducer } from 'react';
import axios from 'axios';

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
}

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = (day) => {dispatch({ type: SET_DAY, day})};

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log('use-effect', all);
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers })
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        const days = updateSpots(state, appointments, id);
        dispatch({ type: SET_INTERVIEW, days, appointments});
      })
  };

  function cancelInterview(id) {
    const interview = null;
    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        const days = updateSpots(state, appointments, id);
        dispatch({ type: SET_INTERVIEW, days, appointments});
      });
  };

  function updateSpots(state, appointments, id) {
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    const currentDay = state.days[currentDayIndex];
    const spots = currentDay.appointments.filter((appointmentId) => {
      return !appointments[appointmentId].interview;
    }).length;

    const newDay = {...currentDay, spots}
    const newDaysArray = [...state.days];
    newDaysArray[currentDayIndex] = newDay;
    return newDaysArray;
  }

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;