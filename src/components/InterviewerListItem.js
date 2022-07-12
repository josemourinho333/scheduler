import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem({ name, avatar, selected, setInterviewer}) {
  let interviewerClass = classNames('interviewers__item', 
    selected ? 'interviewers__item--selected' : ''
  )

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img 
        src={avatar} 
        alt={name}
        className="interviewers__item-image" 
      />
      {selected ? name : ''}
    </li>
  )
}