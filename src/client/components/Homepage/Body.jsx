import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Feed from './Feed';
import Sidebar from './Sidebar';

function Body({ userVideoCollection }) {
  return (
    <div className="body">
      {/* <Sidebar /> */}
      <Feed userVideoCollection={userVideoCollection} />
      {/* <Sidebar /> */}
    </div>
  );
}

Body.propTypes = {};

export default Body;
