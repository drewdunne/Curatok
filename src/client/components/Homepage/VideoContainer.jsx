import React from 'react';
import PropTypes from 'prop-types';
import Video from './Video';

function VideoContainer({ url }) {
  return (
    <div className="video-container">
      <Video url={url} />
    </div>
  );
}

VideoContainer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default VideoContainer;
