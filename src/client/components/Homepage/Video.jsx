import React from 'react';
import PropTypes from 'prop-types';

function Video({ url }) {
  
  return (
    <div className="video-wrapper">
      <iframe
        src={url}
        frameBorder="0"
        width="1080"
        height="1920"
        allow="autplay; ecrypted-media"
        allowFullScreen
        title="video"
      />
      {' '}
    </div>
  );
}

Video.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Video;
