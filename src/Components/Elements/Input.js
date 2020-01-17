import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  handleChange = (e) => {
    const { onInputChange } = this.props;
    onInputChange(e.target.value);
  }

  render() {
    const {
      name,
      value,
      placeholder,
      required,
    } = this.props;

    return (
      <div className={`input ${name}`}>
        <label htmlFor={name}>{placeholder}</label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={this.handleChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
};
