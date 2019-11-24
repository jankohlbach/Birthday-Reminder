import React from 'react';
import PropTypes from 'prop-types';

function ContentWrap({ children }) {
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

export default ContentWrap;
