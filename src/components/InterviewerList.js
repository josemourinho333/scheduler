import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';
import './InterviewerList.scss';

export default function InterviewerList({ interviewers, setInterviewer, interviewer}) {
  const interviewersMap = interviewers.map((person) => {
    return (
      <InterviewerListItem 
        key={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id === interviewer}
        setInterviewer={() => setInterviewer(person.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersMap}
      </ul>
    </section>
  )
}