const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTHS_30 = ['02', '04', '06', '09', '11'];
const MONTHS_31 = ['01', '03', '05', '07', '08', '10', '12'];

const date = new Date();
const CURRENT_DAY = date.getDate();
const CURRENT_MONTH = date.getMonth() + 1;
const CURRENT_YEAR = date.getFullYear();

export {
  MONTHS,
  MONTHS_30,
  MONTHS_31,
  CURRENT_DAY,
  CURRENT_MONTH,
  CURRENT_YEAR,
};
