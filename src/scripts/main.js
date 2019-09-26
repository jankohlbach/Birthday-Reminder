(() => {
  /**
   *
   * REGISTER SERVICE-WORKER
   *
   */
  (() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/dist/service-worker.js').then((reg) => {
        // navigator.serviceWorker.register('/service-worker.js').then((reg) => {
          // eslint-disable-next-line no-console
          console.log('Successfully registered service worker', reg);
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.warn('Error whilst registering service worker', err);
        });
      });
    }
  })();

  /**
   *
   * BIRTHDAY-CLASS
   *
   */
  (() => {
    class Birthday {
      constructor() {
        this.birthdays = [];

        this.CACHE_STORAGE_KEY = 'data-cache';

        this.validateDay = this.validateDay.bind(this);
        this.validateMonth = this.validateMonth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.initApp();
      }

      // helpers
      setCacheStorage(entry) {
        const dbRequest = indexedDB.open(this.CACHE_STORAGE_KEY);

        dbRequest.onsuccess = () => {
          const db = dbRequest.result;
          const transaction = db.transaction('birthdays', 'readwrite');
          const objectStore = transaction.objectStore('birthdays');

          objectStore.put(entry);
        };
      }

      deleteElementInCache(hash) {
        const dbRequest = indexedDB.open(this.CACHE_STORAGE_KEY);

        dbRequest.onsuccess = () => {
          const db = dbRequest.result;
          const transaction = db.transaction('birthdays', 'readwrite');
          const objectStore = transaction.objectStore('birthdays');

          objectStore.delete(hash);
        };
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
          if (a.month < b.month) return -1;

          if (a.month === b.month) {
            if (a.day > b.day) return 1;
            if (a.day < b.day) return -1;
            return 0;
          }

          return 0;
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

      initDB() {
        if (!('indexedDB' in window)) {
          // eslint-disable-next-line no-console
          console.log('This browser does not support IndexedDB');
          return;
        }

        const dbRequest = indexedDB.open(this.CACHE_STORAGE_KEY, 1);

        dbRequest.onupgradeneeded = () => {
          const db = dbRequest.result;

          if (!db.objectStoreNames.contains('birthdays')) {
            const birthdayOS = db.createObjectStore('birthdays', { keyPath: 'hash' });

            birthdayOS.createIndex('day', 'day', { unique: false });
            birthdayOS.createIndex('month', 'month', { unique: false });
            birthdayOS.createIndex('year', 'year', { unique: false });
            birthdayOS.createIndex('name', 'name', { unique: false });
            birthdayOS.createIndex('info', 'info', { unique: false });
          }
        };
      }

      initApp() {
        this.initNodeElements();
        this.initYearInput();
        this.setUpMonthVariables();
        this.setUpEventListeners();
        this.initDB();
        this.updateList();
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
        const dbRequest = indexedDB.open(this.CACHE_STORAGE_KEY);

        dbRequest.onsuccess = () => {
          const db = dbRequest.result;
          const transaction = db.transaction('birthdays', 'readonly');
          const objectStore = transaction.objectStore('birthdays');

          const osRequest = objectStore.getAll();

          osRequest.onsuccess = () => {
            this.birthdays = osRequest.result;
            this.displayList();
          };
        };
      }

      displayList() {
        Birthday.sortList(this.birthdays);

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

      handleSubmit(e) {
        const newEntry = this.getFormData(e);
        this.birthdays.push(newEntry);
        this.setCacheStorage(newEntry);
        this.updateList();
        this.form.reset();
      }

      // button click
      handleButtonClick(e) {
        if (e.target.tagName.toLowerCase() !== 'button') return;

        const button = e.target;

        if (button.classList.contains('buttons-delete')) {
          const hashToDelete = button.parentNode.parentNode.id;

          // check if id is there, otherwise don't delete wrong elements
          if (hashToDelete !== '') {
            const indexToDelete = this.birthdays
              .findIndex(birthday => birthday.hash === hashToDelete);
            this.birthdays.splice(indexToDelete, 1);
            this.deleteElementInCache(hashToDelete);
            this.updateList();
          }
        }
      }
    }

    window.addEventListener('load', () => {
      // eslint-disable-next-line no-unused-vars
      const birthday = new Birthday();
    });
  })();
})();
