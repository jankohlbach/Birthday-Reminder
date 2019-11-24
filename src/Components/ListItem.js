import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function ListItem(props) {
  const {
    day,
    month,
    year,
    name,
    info,
    hash,
  } = props;

  const eventDay = parseInt(day, 10);
  const eventMonth = parseInt(month, 10);

  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  return (
    <div id={hash} className={`list-item${eventDay === currentDay && eventMonth === currentMonth ? ' today' : ''}`}>
      <span className="day">{day}</span>
      <div className="container">
        <span className="name">{name}</span>
        {year && (
          <span className="age">
            {
              // eslint-disable-next-line no-nested-ternary
              eventMonth > currentMonth || (eventMonth === currentMonth && eventDay >= currentDay
                ? (eventDay === currentDay
                  ? `turns: ${currentYear - year}`
                  : `age: ${currentYear - year - 1}`
                )
                : `age: ${currentYear - year}`
              )
            }
          </span>
        )}
      </div>
      <div className="buttons">
        <Button name="edit" />
        <Button name="delete" />
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
};

export default ListItem;
