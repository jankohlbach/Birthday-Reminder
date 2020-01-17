import React from 'react';
import { Link } from 'react-router-dom';
import ContentWrap from './ContentWrap';

export default function Footer() {
  return (
    <footer>
      <ContentWrap>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/imprint">Imprint</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </nav>
        <p>
          Jan Kohlbach |
          {` ${new Date().getFullYear()}`}
        </p>
      </ContentWrap>
    </footer>
  );
}
