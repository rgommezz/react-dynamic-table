import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import store from './store';
import routes from './routes';
import Root from './components/Root';

import './styles/index.css';

ReactDOM.render(
  <Root
    history={browserHistory}
    store={store}
    routes={routes}
  />,
  document.getElementById('root')
);
