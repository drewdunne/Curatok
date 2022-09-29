import React from 'react';
import PropTypes from 'prop-types';
import Feed from './Feed';
import Sidebar from './Sidebar';

function Body(props) {
  return (
    <div className="body">
      {/* <Sidebar /> */}
      <Feed />
      {/* <Sidebar /> */}
    </div>
  );
}

Body.propTypes = {};

export default Body;
