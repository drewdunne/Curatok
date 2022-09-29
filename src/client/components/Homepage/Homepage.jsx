import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from './Header';
import HashtagBanner from './HashtagBanner';
import Body from './Body';

function Homepage({ userVideoCollection }) {
  console.log(`Homepage's ${userVideoCollection}`);

  return (
    <div id="homepage">
      <Header />
      <HashtagBanner />
      <Body userVideoCollection={userVideoCollection} />

    </div>
  );
}

export default Homepage;
