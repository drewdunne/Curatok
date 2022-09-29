/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Video from './Video';
import HashtagBanner from './HashtagBanner';

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.url);
    this.state = {
      autoplay: '',
    };
  }

  render() {
    return (
      <div id={this.props.id} className="video-container">
        <Video id={`${this.props.id}-video`} url={this.props.url} autoplay={this.state.autoplay} />
        <HashtagBanner className="video-hashtag-banner" />
      </div>
    );
  }
}

// 'autplay; ecrypted-media'
export default VideoContainer;
