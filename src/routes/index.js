import React from 'react';
import { Route } from 'react-router';
import App from '../components/App';
import Login from '../components/Login';
import Posts from '../components/Posts';

function checkIfUserLoggedIn(nextState, replace) {
  // Temporarily, we assume user wasn't logged in previously.
  const userIsLoggedIn = false;
  if (nextState.location.pathname === '/' && !userIsLoggedIn) {
    replace('/login');
  }
}

export default (
  <Route path="/" component={App} onEnter={checkIfUserLoggedIn}>
    <Route path="login" component={Login} />
    <Route path="posts" component={Posts} />
  </Route>
);
