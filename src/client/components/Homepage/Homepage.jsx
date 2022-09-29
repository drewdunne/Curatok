import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from './Header';
import HashtagBanner from './HashtagBanner';
import Body from './Body';

function Homepage(props) {
//   useEffect(() => {

  //   });

  return (
    <div id="homepage">
      <Header />
      <HashtagBanner />
      <Body />

    </div>
  );
}

export default Homepage;
