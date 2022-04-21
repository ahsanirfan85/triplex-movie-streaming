import React, { useEffect, useState } from 'react';
import watchlistDB from '../../data/db';

const WatchListButton = (props) => {
  const [label, setLabel] = useState("Add to Watch List");

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
    } else {
      movie.isSelected = true
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

export default WatchListButton;