import React from 'react';
import ContentWrap from './ContentWrap';

function Footer() {
  return (
    <footer>
      <ContentWrap>
        <p>
          Jan Kohlbach |
          {` ${new Date().getFullYear()}`}
        </p>
      </ContentWrap>
    </footer>
  );
}

export default Footer;
