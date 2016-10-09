import React, { PropTypes } from 'react';
import '../styles/Header.css';

const Header = ({ title, username, handleLogout }) => (
  <div className="Header">
    <h4>{title || 'Tabular app'}</h4>
    {username && (
      <div>
        <span className="Username">{username}</span>
        <span className="Logout" onClick={handleLogout}>Logout</span>
      </div>
    )}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
