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
  isLoggingIn: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.user.username,
  isLoggingIn: state.user.isLoggingIn,
});

export default connect(mapStateToProps, { handleLogout })(App);
