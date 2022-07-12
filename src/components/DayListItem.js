import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem({ name, spots, selected, setDay }) {
  let dayClass = classNames('day-list__item',
    selected ? 'day-list__item--selected' :
    spots === 0 ? 'day-list__item--full' :
    ''
  )

  return (
    <li onClick={setDay} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">
        {
          spots === 0 ? 'no spots remaining' :
          spots === 1 ? '1 spot remaining' :
          spots > 1 ? `${spots} spots remaining` : 
          ''
        }
      </h3>
    </li>
  );
}