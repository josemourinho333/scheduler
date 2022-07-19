import { useEffect, useState } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => {
    setState({
      ...state, 
      day
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
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
        setState({...state, days, appointments});
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
        setState({...state, days, appointments});
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