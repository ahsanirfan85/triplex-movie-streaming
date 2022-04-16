import React from "react"
import PageHeader from "../components/page-header/PageHeader"
import { Player } from 'video-react';
import "../pages/detail/detail.scss"

const MoviePlay = () => {
  
  const videoSrc = 'https://firebasestorage.googleapis.com/v0/b/fir-cbdb5.appspot.com/o/The%20Batman%20(2022)%201080p%20HDRip%20x264%20-%20ProLover.mp4?alt=media&token=99004156-4195-45a1-af0a-d2e5e872224a';
  const poster = 'https://cdn.wallpapersafari.com/5/80/bhan9W.jpg';
  
  
  
  
  return (
    
    
    <>
      <div className="container">
        <div className="section mb-3">
          <PageHeader />
          <div className="movie-play" id="target">
          <Player className="movie-play__player">
              <source src={ videoSrc } poster={poster}/>
          </Player>
          </div>
        </div>
      </div>
    </>
  )
}

export default MoviePlay
