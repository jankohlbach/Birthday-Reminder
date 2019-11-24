import React from 'react';
import ContentWrap from './Layout/ContentWrap';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Form from './Components/Form';
import ListView from './Components/ListView';

function App() {
  const data = [
    {
      day: '19',
      month: '01',
      year: '1998',
      name: 'Me',
      info: '',
      hash: '157452836880278',
    },
    {
      day: '04',
      month: '02',
      year: '2002',
      name: 'Person 1',
      info: '',
      hash: '157452838056285',
    },
    {
      day: '20',
      month: '12',
      year: '',
      name: 'Random',
      info: '',
      hash: '157452838056288',
    },
    {
      day: '25',
      month: '11',
      year: '1998',
      name: 'Random',
      info: '',
      hash: '157552838056288',
    },
    {
      day: '24',
      month: '11',
      year: '1998',
      name: 'Random',
      info: '',
      hash: '157452868056288',
    },
    {
      day: '23',
      month: '11',
      year: '1998',
      name: 'Random',
      info: '',
      hash: '127452838056288',
    },
  ];

  return (
    <>
      <Header />
      <main>
        <ContentWrap>
          <h2>Add new entry</h2>
          <Form />
          <ListView data={data} />
        </ContentWrap>
      </main>
      <Footer />
    </>
  );
}

export default App;
