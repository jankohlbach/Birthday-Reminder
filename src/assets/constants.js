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

const date = new Date();
const CURRENT_DAY = date.getDate();
const CURRENT_MONTH = date.getMonth() + 1;
const CURRENT_YEAR = date.getFullYear();

export {
  MONTHS,
  CURRENT_DAY,
  CURRENT_MONTH,
  CURRENT_YEAR,
};
