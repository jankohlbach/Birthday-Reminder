(() => {
  let birthdays = [];
  const form = document.querySelector('form');
  const dayInput = form.querySelector('#day');
  const monthInput = form.querySelector('#month');
  const yearInput = form.querySelector('#year');
  const nameInput = form.querySelector('#name');
  const infoInput = form.querySelector('#info');
  const list = document.querySelector('.list');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const LOCAL_STORAGE_KEY = 'birthdays';

  const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const getLocalStorage = key => JSON.parse(localStorage.getItem(key));

  const initYearInput = () => {
    const currentYear = new Date().getFullYear();

    for (let i = 0; i <= 100; i += 1) {
      const option = document.createElement('option');
      const yearToAdd = currentYear - i;
      option.value = yearToAdd;
      option.textContent = yearToAdd;
      yearInput.appendChild(option);
    }
  };

  const validateDay = () => {
    const months31 = ['01', '03', '05', '07', '08', '10', '12'];
    const option30 = dayInput.querySelector('option[value="30"]');
    const option31 = dayInput.querySelector('option[value="31"]');

    if (!months31.includes(monthInput.value)) {
      option31.setAttribute('disabled', '');
      if (dayInput.value === '31') dayInput.value = '';

      if (monthInput.value === '2') {
        option30.setAttribute('disabled', '');
        if (dayInput.value === '30' || dayInput.value === '31') dayInput.value = '';
      }
    } else {
      [option30, option31].forEach(option => option.removeAttribute('disabled'));
    }
  };

  const validateMonth = () => {
    const months30 = ['04', '06', '09', '11'];
    const option2 = monthInput.querySelector('option[value="02"]');

    if (dayInput.value === '30') {
      option2.setAttribute('disabled', '');
      months30.forEach(month => monthInput.querySelector(`option[value="${month}"]`).removeAttribute('disabled'));
    } else if (dayInput.value === '31') {
      option2.setAttribute('disabled', '');
      months30.forEach(month => monthInput.querySelector(`option[value="${month}"]`).setAttribute('disabled', ''));
    } else {
      option2.removeAttribute('disabled');
    }
  };

  const generateHash = () => {
    const currentDate = new Date().getTime();
    const random = Math.floor(Math.random() * 100);
    const hash = currentDate.toString() + random.toString();
    return hash;
  };

  const sortList = (array) => {
    array.sort((a, b) => {
      if (a.month > b.month) {
        return 1;
      }

      if (a.month === b.month) {
        if (a.day > b.day) {
          return 1;
        }
      }

      return null;
    });
  };

  const updateList = () => {
    birthdays = getLocalStorage(LOCAL_STORAGE_KEY);

    const date = new Date();
    const currentYear = date.getFullYear();

    list.innerHTML = '';
    let month;

    birthdays.forEach((birthday) => {
      if (month !== birthday.month) {
        const monthElement = document.createElement('div');
        monthElement.classList.add('month');
        monthElement.innerHTML = `
          <span class="month">${months[parseInt(birthday.month, 10) - 1]}</span>
          <span class="year">${currentYear}</span>
        `;
        list.appendChild(monthElement);
      }

      const listElement = document.createElement('div');
      listElement.classList.add('list-item');
      listElement.id = birthday.hash;
      listElement.innerHTML = `
        <span class="date">${birthday.day}</span>
        <span class="name">${birthday.name}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;
      list.appendChild(listElement);

      ({ month } = birthday);
    });
  };

  const updateAll = () => {
    setLocalStorage(LOCAL_STORAGE_KEY, birthdays);
    updateList();
  };

  const getFormData = (e) => {
    e.preventDefault();

    return {
      day: dayInput.value,
      month: monthInput.value,
      year: yearInput.value,
      name: nameInput.value,
      info: infoInput.value,
      hash: generateHash(),
    };
  };

  const handleSubmit = (e) => {
    const newEntry = getFormData(e);
    birthdays.push(newEntry);
    sortList(birthdays);
    updateAll();
    form.reset();
  };

  const handleButtonClick = (e) => {
    if (e.target.tagName.toLowerCase() !== 'button') return;

    const button = e.target;

    if (button.classList.contains('delete')) {
      const idToDelete = button.parentNode.id;
      const indexToDelete = birthdays.findIndex(birthday => birthday.hash === idToDelete);

      birthdays.splice(indexToDelete, 1);

      updateAll();
    }
  };

  initYearInput();
  if (getLocalStorage(LOCAL_STORAGE_KEY)) {
    updateList();
  }
  dayInput.addEventListener('change', validateMonth);
  monthInput.addEventListener('change', validateDay);
  form.addEventListener('submit', handleSubmit);
  list.addEventListener('click', handleButtonClick);
}).call(this);
