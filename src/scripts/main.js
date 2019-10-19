(() => {
  /**
   *
   * REGISTER SERVICE-WORKER
   *
   */
  (() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/dist/service-worker.js')
        navigator.serviceWorker.register('/service-worker.js')
          .then((reg) => {
            // eslint-disable-next-line no-console
            console.log('Successfully registered service worker', reg);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error('Error whilst registering service worker', err);
          });
      });
    }
  })();

  // scroll-to-top function
  const scrollToTop = function scrollToTop() {
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const endPoint = 0;
    const duration = 600;

    const scroll = function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      const timeFunction = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
      window.scroll(0, Math.ceil(timeFunction * (endPoint - start) + start));

      if (window.pageYOffset === endPoint) {
        return;
      }

      requestAnimationFrame(scroll);
    };

    scroll();
  };

  /**
   *
   * EVENT-CLASS
   *
   */
  (() => {
    class Event {
      constructor() {
        this.events = [];

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
          const transaction = db.transaction('events', 'readwrite');
          const objectStore = transaction.objectStore('events');

          objectStore.put(entry);
        };
      }

      deleteElementInCache(hash) {
        const dbRequest = indexedDB.open(this.CACHE_STORAGE_KEY);

        dbRequest.onsuccess = () => {
          const db = dbRequest.result;
          const transaction = db.transaction('events', 'readwrite');
          const objectStore = transaction.objectStore('events');

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
        this.submit = this.form.querySelector('button');
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

          if (!db.objectStoreNames.contains('events')) {
            const eventOS = db.createObjectStore('events', { keyPath: 'hash' });

            eventOS.createIndex('day', 'day', { unique: false });
            eventOS.createIndex('month', 'month', { unique: false });
            eventOS.createIndex('year', 'year', { unique: false });
            eventOS.createIndex('name', 'name', { unique: false });
            eventOS.createIndex('info', 'info', { unique: false });
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
          hash: Event.generateHash(),
        };
      }

      updateList() {
        const dbRequest = indexedDB.open(this.CACHE_STORAGE_KEY);

        dbRequest.onsuccess = () => {
          const db = dbRequest.result;
          const transaction = db.transaction('events', 'readonly');
          const objectStore = transaction.objectStore('events');

          const osRequest = objectStore.getAll();

          osRequest.onsuccess = () => {
            this.events = osRequest.result;
            this.displayList();
          };
        };
      }

      displayList() {
        Event.sortList(this.events);

        const date = new Date();
        const currentDay = date.getDate();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();

        // eslint-disable-next-line no-param-reassign
        [this.listCurrent, this.listNext].forEach((list) => { list.innerHTML = ''; });
        let month = null;

        this.events.forEach((event) => {
          const eventDay = parseInt(event.day, 10);
          const eventMonth = parseInt(event.month, 10);

          const monthElement = document.createElement('h3');
          monthElement.classList.add('date');
          monthElement.innerHTML = `
            <span class="month">${this.MONTH_NAMES[parseInt(event.month, 10) - 1]}</span>
            <span class="year">${eventMonth > currentMonth || (eventMonth === currentMonth && eventDay >= currentDay) ? currentYear : currentYear + 1}</span>
          `;

          /* eslint-disable no-nested-ternary, indent */
          const listElement = document.createElement('div');
          listElement.classList.add('list-item');
          if (eventMonth === currentMonth && eventDay === currentDay) {
            listElement.classList.add('today');
          }
          listElement.id = event.hash;
          listElement.innerHTML = `
            <span class="day">${event.day}</span>
            <div class="container">
              <span class="name">${event.name}</span>
              ${event.year !== ''
                ? `<span class="age">\
                    ${(eventMonth > currentMonth || (eventMonth === currentMonth && eventDay >= currentDay))
                      ? (eventDay === currentDay
                        ? (`turns ${currentYear - event.year}`)
                        : (`age: ${currentYear - event.year - 1}`))
                      : (`age: ${currentYear - event.year}`)}
                  </span>`
                : ''
              }
            </div>
            <div class="buttons">
              <button class="buttons-edit"><span class="invisible">Edit</span></button><button class="buttons-delete"><span class="invisible">Delete</span></button>
            </div>
          `;
          /* eslint-enable no-nested-ternary, indent */

          if (eventMonth < currentMonth) {
            this.listNext.append(eventMonth === month
              ? listElement
              : monthElement, listElement);
          } else if (eventMonth > currentMonth) {
            this.listCurrent.append(eventMonth === month
              ? listElement
              : monthElement, listElement);
          } else if (eventDay < currentDay) {
            this.listNext.append(eventMonth === month
              ? listElement
              : monthElement, listElement);
          } else if (eventMonth === month) {
            if (this.listCurrent.innerHTML === '') {
              this.listCurrent.append(monthElement, listElement);
            }
            this.listCurrent.append(listElement);
          } else {
            this.listCurrent.append(monthElement, listElement);
          }

          month = eventMonth;
        });
      }

      handleSubmit(e) {
        const newEntry = this.getFormData(e);
        this.events.push(newEntry);
        this.setCacheStorage(newEntry);
        this.updateList();
        this.form.reset();
      }

      changeData(hashToChange) {
        const headline = this.form.previousElementSibling;
        const headlineReset = headline.textContent;
        const submitReset = this.submit.textContent;
        const indexToChange = this.events.findIndex(event => event.hash === hashToChange);
        const elementToChange = this.events[indexToChange];
        headline.textContent = 'Change entry';
        this.submit.textContent = 'Change';
        this.dayInput.value = elementToChange.day;
        this.monthInput.value = elementToChange.month;
        this.yearInput.value = elementToChange.year;
        this.nameInput.value = elementToChange.name;
        this.infoInput.value = elementToChange.info;
        scrollToTop();
        this.events.splice(indexToChange, 1);
        this.deleteElementInCache(hashToChange);

        const resetFormText = this.form.addEventListener('submit', () => {
          headline.textContent = headlineReset;
          this.submit.textContent = submitReset;
          this.form.removeEventListener('submit', resetFormText);
        });
      }

      // button click
      handleButtonClick(e) {
        if (e.target.tagName.toLowerCase() !== 'button') return;

        const button = e.target;

        if (button.classList.contains('buttons-delete')) {
          const hashToDelete = button.parentNode.parentNode.id;

          // check if id is there, otherwise don't delete wrong elements
          if (hashToDelete !== '') {
            const indexToDelete = this.events
              .findIndex(event => event.hash === hashToDelete);
            this.events.splice(indexToDelete, 1);
            this.deleteElementInCache(hashToDelete);
            this.updateList();
          }
        } else if (button.classList.contains('buttons-edit')) {
          const hashToChange = button.parentNode.parentNode.id;
          this.changeData(hashToChange);
        }
      }
    }

    window.addEventListener('load', () => {
      // eslint-disable-next-line no-unused-vars
      const event = new Event();
    });
  })();
})();
