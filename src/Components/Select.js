import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const { name, options, required } = props;

  return (
    <div className="select-wrapper">
      <select id={name} name={name} value="00" required={required}>
        {options}
      </select>
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.element.isRequired,
  required: PropTypes.bool,
};

Select.defaultProps = {
  required: false,
};

export default Select;
