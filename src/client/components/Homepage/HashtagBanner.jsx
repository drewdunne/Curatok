import React from 'react';
import PropTypes from 'prop-types';
import HashtagButton from './HashtagButton';

function HashtagBanner(props) {
  const [hashtags, setHashtags] = React.useState('');

  return (
    <div id="hashtag-banner">
      <HashtagButton tagName="cats" />
      <HashtagButton tagName="cats" />
      <HashtagButton tagName="cats" />
      <HashtagButton tagName="catssssss" />
      <HashtagButton tagName="cats" />
      <HashtagButton tagName="cats" />
      <HashtagButton tagName="cats" />
      <HashtagButton tagName="cats" />
      <HashtagButton tagName="cats" />
    </div>
  );
}

HashtagBanner.propTypes = {};

export default HashtagBanner;
