import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import Input from './Input';
import generateHash from '../assets/generateHash';
import { days, months, years } from '../assets/selectOptions';
import { validateDay, validateMonth, resetOptions } from '../assets/optionFunctions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: '',
      month: '',
      year: '',
      name: '',
      info: '',
      hash: '',
    };
    this.initialState = this.state;
  }

  handleNameChange = (name) => { this.setState({ name }); };

  handleInfoChange = (info) => { this.setState({ info }); };

  handleDayChange = (day) => {
    this.setState({ day });
    validateMonth(day);
  };

  handleMonthChange = (month) => {
    this.setState({ month });
    validateDay(month);
  };

  handleYearChange = (year) => { this.setState({ year }); };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      hash: generateHash(),
    }, () => {
      const { addEvent } = this.props;
      addEvent(this.state);
      this.setState(this.initialState);
      resetOptions();
    });
  }

  render() {
    const {
      day,
      month,
      year,
      name,
      info,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="date">
          <Select name="day" value={day} onSelectChange={this.handleDayChange} options={days} required />
          <Select name="month" value={month} onSelectChange={this.handleMonthChange} options={months} required />
          <Select name="year" value={year} onSelectChange={this.handleYearChange} options={years} />
        </div>
        <Input name="name" value={name} onInputChange={this.handleNameChange} placeholder="Name" required />
        <Input name="info" value={info} onInputChange={this.handleInfoChange} placeholder="Additional Info" />
        <button type="submit">Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  addEvent: PropTypes.func.isRequired,
};

export default Form;
