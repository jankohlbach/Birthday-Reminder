import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import sortList from '../../helpers/sortList';
import {
  MONTHS,
  CURRENT_DAY,
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '../../constants/months';

export default function ListView(props) {
  const { events, editEvent, askForDelete } = props;
  let headline;
  let prevDay = null;
  let prevMonth = null;

  sortList(events);

  return (
    <div className="list">
      {events.map((object) => {
        const eventDay = parseInt(object.day, 10);
        const eventMonth = parseInt(object.month, 10);

        if (eventMonth !== prevMonth || (eventDay < prevDay)) {
          headline = (
            <h3 className="date">
              <span className="month">{MONTHS[object.month - 1]}</span>
              <span className="year">
                {
                  eventMonth > CURRENT_MONTH
                    || (eventMonth === CURRENT_MONTH && eventDay >= CURRENT_DAY)
                    ? CURRENT_YEAR
                    : CURRENT_YEAR + 1
                }
              </span>
            </h3>
          );
        } else {
          headline = null;
        }

        prevDay = eventDay;
        prevMonth = eventMonth;

        return (
          <React.Fragment key={object.hash}>
            {headline}
            <ListItem
              day={object.day}
              month={object.month}
              year={object.year}
              name={object.name}
              info={object.info}
              hash={object.hash}
              editEvent={editEvent}
              askForDelete={askForDelete}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

ListView.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  editEvent: PropTypes.func.isRequired,
  askForDelete: PropTypes.func.isRequired,
};
