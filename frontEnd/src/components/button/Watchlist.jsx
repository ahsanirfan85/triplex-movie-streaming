import React, { useEffect, useState } from 'react';
import watchlistDB from '../../data/db';

const WatchListButton = (props) => {
  const [label, setLabel] = useState("Add to Watch List");
  // useEffect(()=> {
  //   let movie = watchlistDB.find(
  //     (movie) =>
  //       movie.movieid === Number(props.movieId) &&
  //       movie.type === props.type &&
  //       movie.userid === props.userId
  //   )
  //   if (movie) {
  //     if (movie.isSelected) {
  //       movie.isSelected = false
  //       setLabel("Remove from Watch List")
  //     } else {
  //       movie.isSelected = true
  //       setLabel("Add to Watch List")
  //     }
  //   }
  // },[])

const addWatchList = (movieId, type, userId) => {
  setLabel("Remove From Watch List");
  let movie = watchlistDB.find(
    (movie) =>
      movie.movieid === Number(movieId) &&
      movie.type === type &&
      movie.userid === userId
  )
  if (movie) {
    if (movie.isSelected) {
      movie.isSelected = false
      setLabel("Remove from Watch List")
    } else {
      movie.isSelected = true
      setLabel("Add to Watch List")
    }
  } else {
    watchlistDB.unshift({
      userid: userId,
      movieid: Number(movieId),
      type: type,
      isSelected: true,
    })
  }
}
  return (
      <>
        <button className="btn-like" onClick= {() => addWatchList(props.movieId, props.type, props.userId)}>
          {label}
          <i className="fa-solid fa-plus"></i>
        </button>
        </>
  )}

<<<<<<< HEAD
export default Watchlist;

=======
export default WatchListButton;
>>>>>>> f3506d8cba3074372d604444ad1f1164981f4e8b
