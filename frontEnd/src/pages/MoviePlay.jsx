import React from 'react'
import { Link } from 'react-router-dom';
import "../pages/detail/detail.scss"



export default function MoviePlay() {

  const videoSrc = 'https://firebasestorage.googleapis.com/v0/b/fir-cbdb5.appspot.com/o/The%20Batman%20(2022)%201080p%20HDRip%20x264%20-%20ProLover.mp4?alt=media&token=99004156-4195-45a1-af0a-d2e5e872224a';



    return (
    
    
      <div className="movie-play">
          <div className="movie-back">
          <Link to="/"><span><i class="fa-solid fa-arrow-left" />&nbsp;&nbsp; Back</span></Link>
          </div>
        
        <video className="player" autoPlay progress controls src={ videoSrc }  />
      </div>
    );

}