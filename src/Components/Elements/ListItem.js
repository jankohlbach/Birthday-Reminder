import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import {
  CURRENT_DAY,
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '../../assets/constants';

export default function ListItem(props) {
  const {
    day,
    month,
    year,
    name,
    info,
    hash,
    editEvent,
    deleteEvent,
  } = props;

  const eventDay = parseInt(day, 10);
  const eventMonth = parseInt(month, 10);

  let ageText;

  if (eventMonth > CURRENT_MONTH || (eventMonth === CURRENT_MONTH && eventDay >= CURRENT_DAY)) {
    if (eventDay === CURRENT_DAY) {
      ageText = `turns: ${CURRENT_YEAR - year}`;
    } else {
      ageText = `age: ${CURRENT_YEAR - year - 1}`;
    }
  } else {
    ageText = `age: ${CURRENT_YEAR - year}`;
  }

  const editItem = (e) => {
    const button = e.target;
    const hashToChange = button.parentNode.parentNode.id;
    editEvent(hashToChange);
  };

  const deleteItem = (e) => {
    const button = e.target;
    const hashToDelete = button.parentNode.parentNode.id;
    deleteEvent(hashToDelete);
  };

  return (
    <div id={hash} className={`list-item${eventDay === CURRENT_DAY && eventMonth === CURRENT_MONTH ? ' today' : ''}`}>
      <span className="day">{day}</span>
      <div className="container">
        <span className="name">{name}</span>
        {year && <span className="age">{ageText}</span>}
      </div>
      <div className="buttons">
        <Button name="edit" handleClick={editItem} />
        <Button name="delete" handleClick={deleteItem} />
      </div>
    </div>
  );
}

ListItem.propTypes = {
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  editEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};
