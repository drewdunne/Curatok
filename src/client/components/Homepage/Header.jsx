import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/curatok.png';
import SearchBar from './SearchBar';

function Header(props) {
  return (
    <div id="header">
      <img id="header-logo" src={logo} alt="Curatok Logo" />
      <SearchBar />
      <div id="homepage-header-button">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <span className="material-symbols-outlined"> person </span>
        <input type="button" value="TikTokUser123" />
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
    