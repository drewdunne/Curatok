/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Video from './Video';

class VideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: '',
    };
  }

  render() {
    return (
      <div id={this.props.id} className="video-container">
        <Video id={`${this.props.id}-video`} url={this.props.url} autoplay={this.state.autoplay} />
      </div>
    );
  }
}

// 'autplay; ecrypted-media'
export default VideoContainer;
