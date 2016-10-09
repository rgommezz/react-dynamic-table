import React from 'react';
import { Router } from 'react-router';
import { Route } from 'react-router'
import App from './App';
import Login from './Login';
import Posts from './Posts';

function checkIfUserLoggedIn(nextState, replace){
  // Temporarily, we assume user wasn't logged in previously.
  const userIsLoggedIn = false;
  if (nextState.location.pathname === '/' && !userIsLoggedIn) {
    replace('/login');
  }
}

const Root = ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App} onEnter={checkIfUserLoggedIn}>
        <Route path="login" component={Login} />
        <Route path="posts" component={Posts} />
      </Route>
    </Router>
  )
};

export default Root;