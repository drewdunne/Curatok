import React from 'react';
import PropTypes from 'prop-types';

function SearchBar(props) {
  return (
    <div id="search-bar">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div id="search-icon">
        <span id="search-icon" className="material-symbols-outlined">search</span>
      </div>
      <input type="text" />
    </div>
  );
}

SearchBar.propTypes = {};

export default SearchBar;
