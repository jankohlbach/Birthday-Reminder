import React from 'react';
import ContentWrap from './Layout/ContentWrap';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Form from './Components/Form';
import ListView from './Components/ListView';
import { initDB, addToCache } from './assets/database';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };

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
    addToCache(event);
    this.setState((state) => ({
      events: state.events.concat(event),
    }));
  }

  render() {
    const { events } = this.state;

    return (
      <>
        <Header />
        <main>
          <ContentWrap>
            <h2>Add new entry</h2>
            <Form addEvent={this.addEvent} />
            <ListView events={events} />
          </ContentWrap>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
