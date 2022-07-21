import { useEffect, useReducer } from 'react';
import axios from 'axios';
import {reducer, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from '../reducer/reducer';

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
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
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


    return axios.put(`api/appointments/${id}`, {interview})
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

    return axios.delete(`api/appointments/${id}`, {interview})
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