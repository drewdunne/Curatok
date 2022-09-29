import React from 'react';
import PropTypes from 'prop-types';
import Video from './Video';

function VideoContainer({ url, id }) {
  let domObject;
  let pos;
  React.useEffect(() => {
    domObject = document.getElementById(id);
    pos = domObject.getBoundingClientRect();
  });
  const handleScroll = (event) => {
    console.log('scrollTop: ', event.currentTarget.scrollTop);
    console.log('offsetHeight: ', event.currentTarget.offsetHeight);
    console.log(pos.top);
    console.log(pos.bottom);
  };

  return (
    <div id={id} className="video-container">
      <Video id={`${id}-video`} url={url} />
    </div>
  );
}

VideoContainer.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default VideoContainer;
