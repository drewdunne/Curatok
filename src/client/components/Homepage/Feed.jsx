/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from './VideoContainer';

function Feed({ userVideoCollection }) {
  const videoElementIds = [];
  const video = {};
  const maxFeedCount = 3;
  let i = 0;
  const urls = [];

  function initializeVideos() {
    for (let i = 0; i < maxFeedCount; i++) {
      const rectBoundingBody = document.getElementById(videoElementIds[i]);
      const element = rectBoundingBody.childNodes[0].childNodes[0];
      video[i] = {};
      video[i].element = element;
      video[i].pos = rectBoundingBody.getBoundingClientRect();
    }
  }

  React.useEffect(() => {
    initializeVideos();
    video[i].element.play();
  });

  const handleScroll = (event) => {
    console.log(i);
    console.log(video[i].pos.top);
    console.log('scrollTop: ', event.currentTarget.scrollTop);
    console.log('offsetHeight: ', event.currentTarget.offsetHeight);
    console.log('halfway point of active video:', ((video[i].pos.bottom - video[i].pos.top) / 2) + video[i].pos.top);
    if (i > 0) console.log('halway of previous video', ((video[i - 1].pos.bottom - video[i].pos.top) / 2) + video[i].pos.top - 10);
    if (event.currentTarget.scrollTop
      > (((video[i].pos.bottom - video[i].pos.top) / 2) + video[i].pos.top)) {
      // console.log('Arrived test passed');
      video[i].element.pause();
      i += 1;
      // console.log(`i is now ${i}`);
      video[i].element.play();
    }
    if (i > 0) {
      if (event.currentTarget.scrollTop
        // 10 was chosen arbitrarily as a buffer
        < (((video[i - 1].pos.bottom - video[i - 1].pos.top) / 2) + video[i - 1].pos.top - 10)) {
        video[i].element.pause();
        i -= 1;
        video[i].element.play();
      }
    }
  };

  const idGenerator = () => {
    let count = 0;
    return () => {
      count += 1;
      return `container-${count}`;
    };
  };

  const getUniqueVideoId = idGenerator();

  for (const key in userVideoCollection) {
    console.log('useEffect in Feed test passed');
    // eslint-disable-next-line no-unused-expressions
    console.log(userVideoCollection[key].url);
    urls.push(userVideoCollection[key].url);
  }

  const videoContainers = [];
  for (let i = 0; i < maxFeedCount; i++) {
    const id = getUniqueVideoId();
    const url = urls[i];
    console.log(`pushing ${url} into videoElementIds`);
    videoElementIds.push(id);

    videoContainers.push(<VideoContainer
      id={id}
      url={url}
      key={id}
    />);
  }

  return (
    <div onScroll={handleScroll} id="feed">
      {videoContainers}
    </div>

  );
}

Feed.propTypes = {};

export default Feed;
