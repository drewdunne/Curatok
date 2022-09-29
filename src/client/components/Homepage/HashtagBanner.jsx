import React from 'react';
import PropTypes from 'prop-types';
import HashtagButton from './HashtagButton';

function HashtagBanner(props) {
  const [hashtags, setHashtags] = React.useState('');

  return (
    <div id="hashtag-banner">
      <HashtagButton tagName="#javascript" />
      <HashtagButton tagName="#math" />
      <HashtagButton tagName="#resumes" />
      <HashtagButton tagName="#enrepreneurship" />
      <HashtagButton tagName="#jobhunting" />
      <HashtagButton tagName="#AI" />
      <HashtagButton tagName="#shuffle" />
      <HashtagButton tagName="#product Management" />
    </div>
  );
}

HashtagBanner.propTypes = {};

export default HashtagBanner;
