import React from 'react';
import PropTypes from 'prop-types';

function Button({ name }) {
  return (
    <button className={`buttons-${name}`} type="button" aria-label={name} />
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Button;
