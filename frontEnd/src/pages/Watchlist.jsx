import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';

import axios from 'axios';
import Userfront from '@userfront/core';
import PageHeader from '../components/page-header/PageHeader';
import MovieWatchList from '../components/watchlist/MovieWatchList';
import '../components/watchlist/moviewatchlist.scss';
<<<<<<< HEAD
import watchlistDB from '../data/db';

=======
>>>>>>> axios-watchlist

const Watchlist = () => {
  const [ watchlistDB, setWatchlistDB ] = useState([]);

  const removeWatchList = (movieId, type) => {
    console.log("movie ID", movieId)
    console.log("Category", type)
    let moviesList = [];
    for(let i of watchlistDB) {
<<<<<<< HEAD
      if (i.movieid === movieId && i.type === type) {
        //update the record
        i.isSelected = false;
=======
      if (i.movie_id === movieId && i.type === type) {
        i.is_selected = false;
>>>>>>> axios-watchlist
      }
    }
    for (let i of watchlistDB) {
<<<<<<< HEAD
      const userId = Userfront.user.userId;
      if (i.userid === userId && i.isSelected) {
        moviesList.push(i.movieid);
        categoryList.push(i.type);
      } 
    }
    //use setState (setMovie)
    setMovies(moviesList);
    setCategory(categoryList);
=======
      if (i.user_id === Userfront.user.userId && i.is_selected) {
        moviesList.push(i);
      }
    }
    setWatchlistDB(moviesList);
>>>>>>> axios-watchlist
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/watchlist/${Userfront.user.userId}`)
      .then((response) => {
        console.log(response.data);
        setWatchlistDB(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <PageHeader />
      <div className='container'>
        <div className='section mb-3'>
<<<<<<< HEAD
        <h1 className='center-title'>My Watchlist</h1>
        {
          movies.map((movie, index) => {
            let cate = category[index];
             return <MovieWatchList removeWatchList = {removeWatchList} category = {cate} id = {movie} />
          })   
        }
      </div>
=======
          <h1>Watch List</h1>
            {watchlistDB.map((movie, index) => {
              if (movie.user_id === Userfront.user.userId && movie.is_selected) {
                return <MovieWatchList key={index} removeWatchList = {removeWatchList} category={movie.type} id={movie.movie_id} />}
            })} 
        </div>
>>>>>>> axios-watchlist
      </div>
    </>
  );
};


export default Watchlist;


