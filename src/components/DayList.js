import React from 'react';
import DayListItem from './DayListItem';

export default function DayList({ days, value, onChange }) {

  const dayList = days.map((day) => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === value}
        setDay={() => onChange(day.name)}
      />
    )
  })

  return (
    <ul>
      {dayList}
    </ul>
  )
}