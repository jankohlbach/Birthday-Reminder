import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Components/Pages/Home';
import Imprint from './Components/Pages/Imprint';
import Privacy from './Components/Pages/Privacy';
import ContentWrap from './Components/Layout/ContentWrap';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';

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
