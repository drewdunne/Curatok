/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from './VideoContainer';

function Feed(props) {
  const videoElementIds = [];
  const video = {};
  const maxFeedCount = 3;
  let i = 0;

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

  const urls = [
    'https://v16m-webapp.tiktokcdn-us.com/c774279ec159cbe1c0bd0425e420c3ba/6336172c/video/tos/useast5/tos-useast5-ve-0068c002-tx/ab2736b285b641d69aa7e4dd0a27dee4/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=856&bt=428&cs=0&ds=3&ft=ebtHKH-qMyq8Zyuvzhe2N-A7fl7Gb&mime_type=video_mp4&qs=0&rc=ZjZlM2ZoOWc7OTVoaWU1NkBpamVvcDo6ZnI3ZjMzZzczNEAuMjUuMDAyNWMxXmJjNS1jYSNpZi9ucjQwLV9gLS1kMS9zcw%3D%3D&l=20220929160604C3EFF2E17280D204DDA1',
    'https://v16m-webapp.tiktokcdn-us.com/1daf3856c0a7f4dd64dd6f98bf093abb/633616fa/video/tos/useast2a/tos-useast2a-ve-0068c004/79e43c2eea8840fbad5a27523db91ab3/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=1450&bt=725&cs=0&ds=3&ft=ebtHKH-qMyq8Zyuvzhe2N-A7fl7Gb&mime_type=video_mp4&qs=0&rc=NGk3Nmc2OTZlaWlnZzc3NEBpMztnbjg6ZnM3ZjMzNzczM0AtLWAtMDUwXzQxLjVfMzEtYSMvNjUucjQwXzZgLS1kMTZzcw%3D%3D&l=20220929160604C3EFF2E17280D204DDA1',
    'https://v16m-webapp.tiktokcdn-us.com/1daf3856c0a7f4dd64dd6f98bf093abb/633616fa/video/tos/useast2a/tos-useast2a-ve-0068c004/79e43c2eea8840fbad5a27523db91ab3/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=1450&bt=725&cs=0&ds=3&ft=ebtHKH-qMyq8Zyuvzhe2N-A7fl7Gb&mime_type=video_mp4&qs=0&rc=NGk3Nmc2OTZlaWlnZzc3NEBpMztnbjg6ZnM3ZjMzNzczM0AtLWAtMDUwXzQxLjVfMzEtYSMvNjUucjQwXzZgLS1kMTZzcw%3D%3D&l=20220929160604C3EFF2E17280D204DDA1',
  ];
  const videoContainers = [];
  for (let i = 0; i < 3; i++) {
    const id = getUniqueVideoId();
    const url = urls[i];
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
