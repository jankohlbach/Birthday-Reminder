import React from 'react';
import { Link } from 'react-router-dom';
import ContentWrap from './ContentWrap';
import { subscribePush, unsubscribePush } from '../../helpers/subscription';

export default function Header() {
  const handleClick = (e) => {
    if (Notification.permission === 'denied') {
      // eslint-disable-next-line no-alert
      alert('Please allow notifications first');
      return;
    }

    const isSubscribed = (e.target.dataset.checked === 'true');

    if (isSubscribed) {
      unsubscribePush();
    } else {
      subscribePush();
    }
  };

  return (
    <header>
      <ContentWrap>
        <Link to="/">
          <h1>b-reminded</h1>
        </Link>
        <button type="button" aria-label="enable/disable push notifications" onClick={handleClick} />
      </ContentWrap>
    </header>
  );
}
