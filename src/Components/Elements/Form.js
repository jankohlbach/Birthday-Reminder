import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import Input from './Input';
import generateHash from '../../helpers/generateHash';
import { days, months, years } from '../../constants/selectOptions';
import { validateDay, validateMonth, resetOptions } from '../../helpers/optionFunctions';

export default class Form extends React.Component {
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

  componentDidUpdate = (prevProps, prevState) => {
    const { formState, selectedEvent } = this.props;

    if (formState === 'change' && prevState.hash !== selectedEvent.hash) {
      this.setChangeState(selectedEvent);
    }
  };

  setChangeState = (selectedEvent) => {
    this.setState({
      day: selectedEvent.day,
      month: selectedEvent.month,
      year: selectedEvent.year,
      name: selectedEvent.name,
      info: selectedEvent.info,
      hash: selectedEvent.hash,
    });
  };

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
    const { addEvent, formState } = this.props;

    const submitHandler = () => {
      addEvent(this.state);
      this.setState(this.initialState);
      resetOptions();
    };

    if (formState === 'change') {
      submitHandler();
    } else {
      this.setState({
        hash: generateHash(),
      }, submitHandler);
    }
  }

  render() {
    const {
      day,
      month,
      year,
      name,
      info,
    } = this.state;

    const { formState } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="date">
          <Select
            name="day"
            value={day}
            onSelectChange={this.handleDayChange}
            options={days}
            required
          />
          <Select
            name="month"
            value={month}
            onSelectChange={this.handleMonthChange}
            options={months}
            required
          />
          <Select
            name="year"
            value={year}
            onSelectChange={this.handleYearChange}
            options={years}
          />
        </div>
        <Input
          name="name"
          value={name}
          onInputChange={this.handleNameChange}
          placeholder="Name or Occasion"
          required
        />
        <Input
          name="info"
          value={info}
          onInputChange={this.handleInfoChange}
          placeholder="Additional Info"
        />
        <button type="submit">{formState === 'add' ? 'Add' : 'Change'}</button>
      </form>
    );
  }
}

Form.propTypes = {
  addEvent: PropTypes.func.isRequired,
  formState: PropTypes.string.isRequired,
  selectedEvent: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
    name: PropTypes.string,
    info: PropTypes.string,
    hash: PropTypes.string,
  }).isRequired,
};
