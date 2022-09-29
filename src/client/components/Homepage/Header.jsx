import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/curatok.png';
import SearchBar from './SearchBar';

function Header(props) {
  return (
    <div id="header">
      <img id="header-logo" src={logo} alt="Curatok Logo" />
      <SearchBar />
      <input type="button" value="Username" />
    </div>
  );
}

Header.propTypes = {};

export default Header;
