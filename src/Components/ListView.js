import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

function ListView(props) {
  const { data } = props;

  return (
    <div className="list">
      {data.map((object) => (
        <ListItem
          key={object.hash}
          day={object.day}
          month={object.month}
          year={object.year}
          name={object.name}
          info={object.info}
          hash={object.hash}
        />
      ))}
    </div>
  );
}

ListView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListView;
