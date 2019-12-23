import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Imprint from './Imprint';
import Privacy from './Privacy';
import ContentWrap from './Layout/ContentWrap';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <ContentWrap>
          <Switch>
            <Route path="/imprint">
              <Imprint />
            </Route>
            <Route path="/privacy">
              <Privacy />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ContentWrap>
      </main>
      <Footer />
    </Router>
  );
}
