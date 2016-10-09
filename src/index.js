import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Root from './components/Root';
import './styles/index.css';

ReactDOM.render(
  <Root history={browserHistory} />,
  document.getElementById('root')
);
