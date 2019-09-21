(() => {
  class Birthday {
    constructor() {
      this.birthdays = [];

      this.LOCAL_STORAGE_KEY = 'birthdays';

      this.validateDay = this.validateDay.bind(this);
      this.validateMonth = this.validateMonth.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.initApp();
    }

    // helpers
    static setLocalStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    static getLocalStorage(key) {
      return JSON.parse(localStorage.getItem(key));
    }

    static generateHash() {
      const currentDate = new Date().getTime();
      const random = Math.floor(Math.random() * 100);
      const hash = currentDate.toString() + random.toString();
      return hash;
    }

    validateDay() {
      if (!this.MONTHS_31.includes(this.monthInput.value)) {
        this.MONTH_OPTION_31.setAttribute('disabled', '');
        if (this.monthInput.value === '02') {
          this.MONTH_OPTION_30.setAttribute('disabled', '');
        } else {
          this.MONTH_OPTION_30.removeAttribute('disabled');
        }
      } else {
        [this.MONTH_OPTION_30, this.MONTH_OPTION_31].forEach(option => option.removeAttribute('disabled'));
      }
    }

    validateMonth() {
      switch (this.dayInput.value) {
        case '30':
          this.MONTH_OPTION_2.setAttribute('disabled', '');
          this.MONTHS_30_OPTIONS.forEach(option => option.removeAttribute('disabled'));
          break;
        case '31':
          this.MONTH_OPTION_2.setAttribute('disabled', '');
          this.MONTHS_30_OPTIONS.forEach(option => option.setAttribute('disabled', ''));
          break;
        default:
          this.MONTH_OPTION_2.removeAttribute('disabled');
          this.MONTHS_30_OPTIONS.forEach(option => option.removeAttribute('disabled'));
          break;
      }
    }

    static sortList(array) {
      array.sort((a, b) => {
        if (a.month > b.month) return 1;

        if (a.month === b.month) {
          if (a.day > b.day) return 1;
        }

        return null;
      });
    }

    // initialization
    initNodeElements() {
      this.form = document.querySelector('form');
      this.dayInput = this.form.querySelector('#day');
      this.monthInput = this.form.querySelector('#month');
      this.yearInput = this.form.querySelector('#year');
      this.nameInput = this.form.querySelector('#name');
      this.infoInput = this.form.querySelector('#info');
      this.list = document.querySelector('.list');
      this.listCurrent = this.list.querySelector('.current-year');
      this.listNext = this.list.querySelector('.next-year');
    }

    initYearInput() {
      const currentYear = new Date().getFullYear();

      for (let i = 0; i <= 100; i += 1) {
        const option = document.createElement('option');
        const yearToAdd = currentYear - i;
        option.value = yearToAdd;
        option.textContent = yearToAdd;
        this.yearInput.appendChild(option);
      }
    }

    setUpMonthVariables() {
      this.MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      this.MONTHS_30 = ['04', '06', '09', '11'];
      this.MONTHS_31 = ['01', '03', '05', '07', '08', '10', '12'];
      this.MONTHS_30_OPTIONS = this.MONTHS_30.map(month => this.monthInput.querySelector(`option[value="${month}"]`));
      this.MONTH_OPTION_2 = this.monthInput.querySelector('option[value="02"]');
      this.MONTH_OPTION_30 = this.dayInput.querySelector('option[value="30"]');
      this.MONTH_OPTION_31 = this.dayInput.querySelector('option[value="31"]');
    }

    setUpEventListeners() {
      this.dayInput.addEventListener('change', this.validateMonth);
      this.monthInput.addEventListener('change', this.validateDay);
      this.form.addEventListener('submit', this.handleSubmit);
      this.list.addEventListener('click', this.handleButtonClick);
    }

    initApp() {
      this.initNodeElements();
      this.initYearInput();
      this.setUpMonthVariables();
      this.setUpEventListeners();
      if (Birthday.getLocalStorage(this.LOCAL_STORAGE_KEY)) this.updateList();
    }

    // submit
    getFormData(e) {
      e.preventDefault();

      return {
        day: this.dayInput.value,
        month: this.monthInput.value,
        year: this.yearInput.value,
        name: this.nameInput.value,
        info: this.infoInput.value,
        hash: Birthday.generateHash(),
      };
    }

    updateList() {
      this.birthdays = Birthday.getLocalStorage(this.LOCAL_STORAGE_KEY);

      const date = new Date();
      const currentDay = date.getDate();
      const currentMonth = date.getMonth() + 1;
      const currentYear = date.getFullYear();

      // eslint-disable-next-line no-param-reassign
      [this.listCurrent, this.listNext].forEach((list) => { list.innerHTML = ''; });
      let month = null;

      this.birthdays.forEach((birthday) => {
        const birthdayDay = parseInt(birthday.day, 10);
        const birthdayMonth = parseInt(birthday.month, 10);

        const monthElement = document.createElement('h3');
        monthElement.classList.add('date');
        monthElement.innerHTML = `
          <span class="month">${this.MONTH_NAMES[parseInt(birthday.month, 10) - 1]}</span>
          <span class="year">${birthdayMonth > currentMonth || (birthdayMonth === currentMonth && birthdayDay >= currentDay) ? currentYear : currentYear + 1}</span>
        `;

        const listElement = document.createElement('div');
        listElement.classList.add('list-item');
        listElement.id = birthday.hash;
        listElement.innerHTML = `
          <span class="day">${birthday.day}</span>
          <span class="name">${birthday.name}</span>
          <div class="buttons">
            <button class="buttons-edit"><span class="invisible">Edit</span></button><button class="buttons-delete"><span class="invisible">Delete</span></button>
          </div>
        `;

        if (birthdayMonth < currentMonth) {
          this.listNext.append(birthdayMonth === month
            ? listElement
            : monthElement, listElement);
        } else if (birthdayMonth > currentMonth) {
          this.listCurrent.append(birthdayMonth === month
            ? listElement
            : monthElement, listElement);
        } else if (birthdayDay < currentDay) {
          this.listNext.append(birthdayMonth === month
            ? listElement
            : monthElement, listElement);
        } else if (birthdayMonth === month) {
          if (this.listCurrent.innerHTML === '') {
            this.listCurrent.append(monthElement, listElement);
          }
          this.listCurrent.append(listElement);
        } else {
          this.listCurrent.append(monthElement, listElement);
        }

        month = birthdayMonth;
      });
    }

    updateAll() {
      Birthday.setLocalStorage(this.LOCAL_STORAGE_KEY, this.birthdays);
      this.updateList();
    }

    handleSubmit(e) {
      const newEntry = this.getFormData(e);
      this.birthdays.push(newEntry);
      Birthday.sortList(this.birthdays);
      this.updateAll();
      this.form.reset();
    }

    // button click
    handleButtonClick(e) {
      if (e.target.tagName.toLowerCase() !== 'button') return;

      const button = e.target;

      if (button.classList.contains('buttons-delete')) {
        const idToDelete = button.parentNode.parentNode.id;

        // check if id is there, otherwise don't delete wrong elements
        if (idToDelete !== '') {
          const indexToDelete = this.birthdays.findIndex(birthday => birthday.hash === idToDelete);
          this.birthdays.splice(indexToDelete, 1);
          this.updateAll();
        } else {
          console.error('Could not read ID to delete.');
        }
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  const birthday = new Birthday();
}).call(this);
