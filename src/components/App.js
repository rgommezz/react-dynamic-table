import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../actions';
import Header from './Header';

const App = ({ username, isLoggingIn, children, handleLogout }) => (
  <div className="App">
    <Header
      title="Tabular App"
      username={username}
      isLoggingIn={isLoggingIn}
      handleLogout={handleLogout}
    />
    {children}
  </div>
);

App.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = ({ username, isLoggingIn }) => ({ username, isLoggingIn });

export default connect(mapStateToProps, { handleLogout })(App);
