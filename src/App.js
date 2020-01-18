import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './components/pages/Home';
import Imprint from './components/pages/Imprint';
import Privacy from './components/pages/Privacy';
import ContentWrap from './components/layout/ContentWrap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

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
