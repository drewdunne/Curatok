/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';

function Video({ url, id }) {
  return (
    <div id={id} className="video-wrapper">
      <video
        className=""
        loop=""
        autoPlay=""
        // playsinline="true"
        x5-playsinline="true"
        webkit-playsinline="true"
        tabIndex="2"
        mediatype="video"
        onClick={() => {
          const vid = document.getElementById(id).childNodes[0];
          console.log(vid);
          vid.paused ? vid.play() : vid.pause();
        }}
        src={url}
      />
    </div>

  );
}

Video.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Video;
