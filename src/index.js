import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './main.min.css';
import * as serviceWorker from './serviceWorker';
import { requestPermission } from './helpers/subscription';

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);

serviceWorker.register();
requestPermission();
