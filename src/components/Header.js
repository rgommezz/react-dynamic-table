import React, { PropTypes } from 'react';
import '../styles/Header.css';

const Header = ({ title, username, handleLogout, isLoggingIn }) => (
  <div className="header">
    <div className="header__content">
      <h4>{title || 'Tabular app'}</h4>
      {username && !isLoggingIn && (
        <div>
          <span className="header__username">{username}</span>
          <span 
            tabIndex="0"
            className="header__logout"
            onKeyDown={(e) => { if(e.key === 'Enter') handleLogout() }} // Let's not freak out about performance here :)
            onClick={handleLogout}>
              Logout
          </span>
        </div>
      )}
    </div>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
};

export default Header;
