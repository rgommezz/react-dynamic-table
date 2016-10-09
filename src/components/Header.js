import React from 'react';
import { Link } from 'react-router';
import '../styles/Header.css';

const Header = ({ title, isUserLoggedIn }) => (
  <div className="Header">
    <h4>{title}</h4>
    {isUserLoggedIn && <Link className="Logout" to="/login" >Logout</Link>}
  </div>
);

export default Header;
