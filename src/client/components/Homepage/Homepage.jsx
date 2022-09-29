import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from './Header';
import HashtagBanner from './HashtagBanner';
import Feed from './Feed';

function Homepage(props) {
//   useEffect(() => {

  //   });

  return (
    <div id="homepage">
      <Header />
      <HashtagBanner />
      <Feed />

    </div>
  );
}

export default Homepage;
