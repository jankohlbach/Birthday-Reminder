import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';
import ContentWrap from './layout/ContentWrap';
import Header from './layout/Header';
import Footer from './layout/Footer';

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
