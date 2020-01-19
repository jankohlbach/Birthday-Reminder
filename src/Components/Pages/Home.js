import React from 'react';
import DeleteModal from '../elements/DeleteModal';
import Form from '../elements/Form';
import ListView from '../elements/ListView';
import scrollToTop from '../../helpers/scrollToTop';
import { initDB, addToCache, removeFromCache } from '../../helpers/database';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      formState: 'add',
      selectedEvent: {},
      deleteModal: false,
      hashToDelete: '',
    };
  }

  componentDidMount() {
    initDB();
    this.getCache();
  }

  getCache = () => {
    const dbRequest = indexedDB.open('data-cache');

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction('events', 'readonly');
      const objectStore = transaction.objectStore('events');

      const osRequest = objectStore.getAll();

      osRequest.onsuccess = () => {
        this.setState({
          events: osRequest.result,
        });
      };
    };
  }

  addEvent = (event) => {
    const { formState } = this.state;

    addToCache(event);

    if (formState === 'change') {
      this.deleteEvent(event.hash);
      this.getCache();
    } else {
      this.setState((state) => ({
        events: state.events.concat(event),
      }));
    }

    this.setState({
      formState: 'add',
      selectedEvent: {},
    });
  }

  handleModal = (value) => {
    if (value === 'yes') this.deleteEvent();
    this.setState({
      deleteModal: false,
      hashToDelete: '',
    });
  }

  askForDelete = (hashToDelete) => {
    scrollToTop();

    this.setState({
      deleteModal: true,
      hashToDelete,
    });
  };

  deleteEvent = () => {
    const { hashToDelete } = this.state;

    if (hashToDelete !== '') {
      const { formState } = this.state;

      if (formState !== 'change') {
        removeFromCache(hashToDelete);
      }
      const { events } = this.state;
      const indexToDelete = events.findIndex((event) => event.hash === hashToDelete);
      events.splice(indexToDelete, 1);
      this.setState({
        events,
        hashToDelete: '',
      });
    }
  }

  editEvent = (hashToChange) => {
    scrollToTop();
    const { events } = this.state;
    const eventToChange = events.filter((event) => event.hash === hashToChange);

    this.setState({
      formState: 'change',
      selectedEvent: eventToChange[0],
    });
  }

  render() {
    const {
      events,
      formState,
      selectedEvent,
      deleteModal,
    } = this.state;

    return (
      <>
        {deleteModal && <DeleteModal handleModal={this.handleModal} />}
        <h2>{formState === 'add' ? 'Add new entry' : 'Change entry'}</h2>
        <Form
          addEvent={this.addEvent}
          formState={formState}
          selectedEvent={selectedEvent}
        />
        <ListView
          events={events}
          editEvent={this.editEvent}
          askForDelete={this.askForDelete}
        />
      </>
    );
  }
}
