import React from 'react';
import Select from './Select';
import Input from './Input';
import { days, months, years } from '../assets/selectOptions';

function Form() {
  return (
    <form>
      <div className="date">
        <Select name="day" options={days} required />
        <Select name="month" options={months} required />
        <Select name="year" options={years} />
      </div>
      <Input name="name" placeholder="Name" required />
      <Input name="info" placeholder="Additional Info" />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
