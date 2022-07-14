export function getAppointmentsForDay(state, day) {
  const theDay = state.days.find(element => element.name === day)

  if (!state.days.length || !theDay) {
    return [];
  }

  const result = theDay.appointments.map((theDayItem) => {
    return state.appointments[theDayItem]
  })

  return result;
}

export function getInterview(state, interview) {
  return !interview ? null : interview = {...interview, interviewer: state.interviewers[interview.interviewer]};
}