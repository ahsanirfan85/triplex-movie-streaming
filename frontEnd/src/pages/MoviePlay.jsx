import React, { Component } from "react";
import "../pages/detail/detail.scss"
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { Link } from "react-router-dom";

const videoSrc = 'https://firebasestorage.googleapis.com/v0/b/fir-cbdb5.appspot.com/o/The%20Batman%20(2022)%201080p%20HDRip%20x264%20-%20ProLover.mp4?alt=media&token=99004156-4195-45a1-af0a-d2e5e872224a';
class MoviePlay extends Component {
  componentDidMount() {
    console.log(this.player);
    this.player.toggleFullscreen();
  }


  
  render() {
    return (
      <div className="movie-play">
          <div className="movie-back">
          <Link to="/"><span><i class="fa-solid fa-arrow-left" />&nbsp;&nbsp; Back</span></Link>
          </div>
        
        <Player
          autoPlay
          ref={c => {
            this.player = c;
          }}
          playsInline
        >
          <source
            src={videoSrc}
            type="video/mp4"
          />
        </Player>
      </div>
    );
  }
}





export default MoviePlay

  
