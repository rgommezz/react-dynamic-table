import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

const Root = ({ history, store, routes }) => {
  return (
    <Provider store={store} >
      <Router history={history} routes={routes} />
    </Provider>
  )
};

export default Root;
