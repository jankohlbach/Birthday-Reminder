import React from 'react';

const days = (
  <>
    <option key="option-day-00" value="" disabled hidden>Day</option>
    <option key="option-day-01" value="01">01</option>
    <option key="option-day-02" value="02">02</option>
    <option key="option-day-03" value="03">03</option>
    <option key="option-day-04" value="04">04</option>
    <option key="option-day-05" value="05">05</option>
    <option key="option-day-06" value="06">06</option>
    <option key="option-day-07" value="07">07</option>
    <option key="option-day-08" value="08">08</option>
    <option key="option-day-09" value="09">09</option>
    <option key="option-day-10" value="10">10</option>
    <option key="option-day-11" value="11">11</option>
    <option key="option-day-12" value="12">12</option>
    <option key="option-day-13" value="13">13</option>
    <option key="option-day-14" value="14">14</option>
    <option key="option-day-15" value="15">15</option>
    <option key="option-day-16" value="16">16</option>
    <option key="option-day-17" value="17">17</option>
    <option key="option-day-18" value="18">18</option>
    <option key="option-day-19" value="19">19</option>
    <option key="option-day-20" value="20">20</option>
    <option key="option-day-21" value="21">21</option>
    <option key="option-day-22" value="22">22</option>
    <option key="option-day-23" value="23">23</option>
    <option key="option-day-24" value="24">24</option>
    <option key="option-day-25" value="25">25</option>
    <option key="option-day-26" value="26">26</option>
    <option key="option-day-27" value="27">27</option>
    <option key="option-day-28" value="28">28</option>
    <option key="option-day-29" value="29">29</option>
    <option key="option-day-30" value="30">30</option>
    <option key="option-day-31" value="31">31</option>
  </>
);

const months = (
  <>
    <option key="option-month-00" value="" disabled hidden>Month</option>
    <option key="option-month-01" value="01">01</option>
    <option key="option-month-02" value="02">02</option>
    <option key="option-month-03" value="03">03</option>
    <option key="option-month-04" value="04">04</option>
    <option key="option-month-05" value="05">05</option>
    <option key="option-month-06" value="06">06</option>
    <option key="option-month-07" value="07">07</option>
    <option key="option-month-08" value="08">08</option>
    <option key="option-month-09" value="09">09</option>
    <option key="option-month-10" value="10">10</option>
    <option key="option-month-11" value="11">11</option>
    <option key="option-month-12" value="12">12</option>
  </>
);

const currentYear = new Date().getFullYear();
const options = [];
for (let i = 0; i <= 100; i += 1) {
  const yearToAdd = currentYear - i;
  options.push(<option key={`option-year-${yearToAdd}`} value={yearToAdd}>{yearToAdd}</option>);
}

const years = (
  <>
    <option key="option-year-00" value="" disabled>Year</option>
    {options}
  </>
);

export { days, months, years };
