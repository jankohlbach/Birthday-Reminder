import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  handleChange = (e) => {
    const { onSelectChange } = this.props;
    onSelectChange(e.target.value);
  }

  render() {
    const {
      name,
      options,
      value,
      required,
    } = this.props;

    return (
      <div className="select-wrapper">
        <label htmlFor={name}>{name}</label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={this.handleChange}
          required={required}
        >
          {options}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.element.isRequired,
  value: PropTypes.string.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

Select.defaultProps = {
  required: false,
};
