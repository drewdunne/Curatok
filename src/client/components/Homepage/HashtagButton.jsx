import React from 'react';
import PropTypes from 'prop-types';

function HashtagButton({ tagName }) {
  return (
    <div className="hashtag-button-border-wrapper">
      <div className="hashtag-button">
        <span className="hashtag-button-text">
          {tagName}
        </span>
        {/* <div className="hashtag-button-text">{tagName}</div> */}
      </div>
    </div>
  );
}

HashtagButton.propTypes = {
  tagName: PropTypes.string.isRequired,
};

export default HashtagButton;
