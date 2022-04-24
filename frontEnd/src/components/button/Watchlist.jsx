import React, { useEffect, useState } from 'react';
import Userfront from '@userfront/core';
import axios from 'axios';
//import watchlistDB from '../../data/db';

const WatchListButton = ({  label, userId, type, movieId }) => {
  const [buttonLabel, setButtonLabel] = useState('');

  const [ watchlistDB, setWatchlistDB ] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/watchlist/${Userfront.user.userId}`)
      .then((response) => {
        console.log(response.data);
        setWatchlistDB(response.data);
        //setButtonLabel(label);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
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
    console.log(watchlistDB);
    let isMovieInWatchlist = false;
    let isMovieInWatchlistButFalse = false;
    for (const movie of watchlistDB) {
      if (movie.movie_id === Number(movieId) && movie.is_selected) {
        isMovieInWatchlist = true;
        console.log(isMovieInWatchlist);
        console.log(movie.is_selected);
      } else if (movie.movie_id === Number(movieId) && !movie.is_selected) {
        isMovieInWatchlistButFalse = true;
      }
    }
    if (isMovieInWatchlist) {
      axios
      .put(`http://localhost:3001/watchlist/remove/${type}/${userId}/${movieId}`)
      .then((response) => {
        console.log(response);
        setButtonLabel("Add to Watch List ");
      })
      .catch((error) => {
        console.log(error);
      });
    } else if (isMovieInWatchlistButFalse) {
      console.log("yup!");
      axios
      .put(`http://localhost:3001/watchlist/update/${type}/${userId}/${movieId}`)
      .then((response) => {
        console.log(response);
        setButtonLabel("Remove from Watch List ");
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      console.log("nope!");
      axios
      .put(`http://localhost:3001/watchlist/add/${type}/${userId}/${movieId}`)
      .then((response) => {
        console.log(response);
        setButtonLabel("Remove from Watch List ");
      })
      .catch((error) => {
        console.log(error);
      });
    }
    // let movie = watchlistDB.find(
    //   (movie) =>
    //     movie.movieid === Number(movieId) &&
    //     movie.type === type &&
    //     movie.userid === userId
    // )
    // if (movie) {
    //   if (movie.isSelected) {
    //     movie.isSelected = false
    //     setLabel("Remove from Watch List")
    //   } else {
    //     movie.isSelected = true
    //     setLabel("Add to Watch List")
    //   }
    // } else {
    //   watchlistDB.unshift({
    //     userid: userId,
    //     movieid: Number(movieId),
    //     type: type,
    //     isSelected: true,
    //   })
    // }
  }

  return (
      <>
        <button className="btn-like" onClick= {() => addWatchList(movieId, type, userId)}>
          {buttonLabel === '' ? label : buttonLabel}
        </button>
        </>
  )}

export default WatchListButton;
