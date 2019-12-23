import React from 'react';
import { Link } from 'react-router-dom';
import ContentWrap from './ContentWrap';

function Header() {
  return (
    <header>
      <ContentWrap>
        <Link to="/">
          <h1>b-reminded</h1>
        </Link>
      </ContentWrap>
    </header>
  );
}

export default Header;
