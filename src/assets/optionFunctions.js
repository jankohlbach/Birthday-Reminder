import { MONTHS_30, MONTHS_31 } from './constants';

const resetDayOptions = () => {
  const optionsDays = document.querySelectorAll('select#day option');

  for (let i = 1; i < optionsDays.length; i += 1) {
    optionsDays[i].removeAttribute('disabled');
  }
};

const resetMonthOptions = () => {
  const optionsMonths = document.querySelectorAll('select#month option');

  for (let i = 1; i < optionsMonths.length; i += 1) {
    optionsMonths[i].removeAttribute('disabled');
  }
};

const resetOptions = () => {
  resetDayOptions();
  resetMonthOptions();
};

const validateDay = (month) => {
  resetDayOptions();

  if (!MONTHS_31.includes(month)) {
    document.querySelector('select#day option[value="31"]').setAttribute('disabled', '');

    if (month === '02') {
      document.querySelector('select#day option[value="30"]').setAttribute('disabled', '');
    }
  }
};

const validateMonth = (day) => {
  const options30 = MONTHS_30.map((month) => document.querySelector(`select#month option[value="${month}"]`));

  switch (day) {
    case '30':
      resetMonthOptions();
      document.querySelector('select#month option[value="02"]').setAttribute('disabled', '');
      break;

    case '31':
      resetMonthOptions();
      options30.forEach((option) => option.setAttribute('disabled', ''));
      break;

    default:
      resetMonthOptions();
      break;
  }
};

export { validateDay, validateMonth, resetOptions };
