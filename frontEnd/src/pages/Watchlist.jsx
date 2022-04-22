import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import RequireAuth from '../components/Login/RequireAuth';

import axios from 'axios';
import Userfront from '@userfront/core';
import PageHeader from '../components/page-header/PageHeader';
import MovieWatchList from '../components/watchlist/MovieWatchList';
import '../components/watchlist/moviewatchlist.scss';

const Watchlist = () => {
  const [ watchlistDB, setWatchlistDB ] = useState([]);

  const removeWatchList = (movieId, type) => {
    console.log("movie ID", movieId)
    console.log("Category", type)
    axios
      .put(`http://localhost:3001/watchlist/remove/${type}/${Userfront.user.userId}/${movieId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    let moviesList = [];
    for(let i of watchlistDB) {
      if (i.movie_id === movieId && i.type === type) {
        i.is_selected = false;
      }
    }
    for (let i of watchlistDB) {
      if (i.user_id === Userfront.user.userId && i.is_selected) {
        moviesList.push(i);
      }
    }
    setWatchlistDB(moviesList);
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
      <RequireAuth>
      <div className='container'>
        <div className='section mb-3'>
          <h1 className='center-title'>Watch List</h1>
            {watchlistDB.map((movie, index) => {
              if (movie.user_id === Userfront.user.userId && movie.is_selected) {
                return <MovieWatchList key={index} removeWatchList = {removeWatchList} category={movie.type} id={movie.movie_id} />}
            })} 
        </div>
      </div>
      </RequireAuth>
    </>
  );
};


export default Watchlist;


