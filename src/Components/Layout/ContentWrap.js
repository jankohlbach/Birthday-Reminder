import React from 'react';
import PropTypes from 'prop-types';

export default function ContentWrap({ children }) {
  return (
    <div className="content-wrap">
      {children}
    </div>
  );
}

ContentWrap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
