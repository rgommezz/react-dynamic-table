import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../actions';
import Header from './Header';

const App = ({ username, children, handleLogout }) => (
  <div className="App">
    <Header title="Tabular App" username={username} handleLogout={handleLogout} />
    {children}
  </div>
);

App.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = ({ username }) => ({ username });

export default connect(mapStateToProps, { handleLogout })(App);
