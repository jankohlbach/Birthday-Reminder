import React from 'react';
import PropTypes from 'prop-types';

export default function DeleteModal({ handleModal }) {
  const handleSubmit = (e) => { handleModal(e.target.value); };

  return (
    <div className="delete-modal">
      <div className="content-wrap">
        <p>Are you sure you want to delete this entry?</p>
        <form onSubmit={handleSubmit}>
          <button type="button" value="no" onClick={handleSubmit}>No</button>
          <button type="button" value="yes" onClick={handleSubmit}>Yes</button>
        </form>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  handleModal: PropTypes.func.isRequired,
};
