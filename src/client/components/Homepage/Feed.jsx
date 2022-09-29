import React from 'react';
import PropTypes from 'prop-types';
import VideoContainer from './VideoContainer';

function Feed(props) {
  const handleScroll = (event) => {
    console.log('scrollTop: ', event.currentTarget.scrollTop);
    console.log('offsetHeight: ', event.currentTarget.offsetHeight);
  };
  return (
    <div id="feed" onScroll={handleScroll}>
      <VideoContainer url="https://v16m-webapp.tiktokcdn-us.com/f783cce86766ff18e8f7e8830b7db805/6335aade/video/tos/useast5/tos-useast5-ve-0068c003-tx/12ff4be7ce7347418fee178624624719/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2554&bt=1277&cs=0&ds=3&ft=ebtHKH-qMyq8ZHQTzhe2N6eufl7Gb&mime_type=video_mp4&qs=0&rc=ZGQ4OjY3OGU0Z2k2PDg7aUBpMzdndjk6ZjxyZjMzZzczNEA2XjUuYC4vNTUxL2IwMjYyYSM2M3FjcjRfMmFgLS1kMS9zcw%3D%3D&l=202209290823134E8116BDE4297500889A" />
      <VideoContainer url="https://v16m-webapp.tiktokcdn-us.com/ed487d9390362d4ec7d68d6df41d315f/6335aa90/video/tos/useast5/tos-useast5-ve-0068c001-tx/dc53568f1fde431eba84deaafe3fd2cc/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2454&bt=1227&cs=0&ds=3&ft=ebtHKH-qMyq8ZHQTzhe2N6eufl7Gb&mime_type=video_mp4&qs=0&rc=OjU5aTdnZmQ7ZTo6ZmZmaUBpMztvdGQ6ZjNnZjMzZzczNEAzYmMuYzAwNi4xYjY1L2NhYSNrbmg2cjRfZi9gLS1kMS9zcw%3D%3D&l=202209290823134E8116BDE4297500889A" />
      <VideoContainer url="https://v16m-webapp.tiktokcdn-us.com/571226fb4588b5762883ee981e574074/6335aa7c/video/tos/useast5/tos-useast5-ve-0068c001-tx/60a17b10259346159ccff10866318bd9/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=684&bt=342&cs=0&ds=3&ft=ebtHKH-qMyq8ZHQTzhe2N6eufl7Gb&mime_type=video_mp4&qs=0&rc=NjY3PDQ0NmU7NDhoOThlO0BpM3I0ZGc6ZmZ4ZjMzZzczNEA2MzZfNV8vNmMxNWI0LjFhYSNfNV5ocjRnZl9gLS1kMS9zcw%3D%3D&l=202209290823134E8116BDE4297500889A" />
    </div>

  );
}

Feed.propTypes = {};

export default Feed;
