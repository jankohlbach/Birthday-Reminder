import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { name, placeholder, required } = props;

  return (
    <div className={`input ${name}`}>
      <input id={name} type="text" name={name} placeholder={placeholder} required={required} />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
};

export default Input;
