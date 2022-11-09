import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default class VideoPlayer extends React.Component {
  [x: string]: any;
  componentDidMount(): void {
    this.player = videojs(this.videoNode, this.props, () => {
      videojs.log("onPlayerReady", this);
    });
  }

  render(): React.ReactNode {
    return (
      <div data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js"
        ></video>
      </div>
    );
  }
}
