import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Userfront from '@userfront/core';
import PageHeader from '../components/page-header/PageHeader';
import MovieWatchList from '../components/watchlist/MovieWatchList';
import '../components/watchlist/moviewatchlist.scss';
import watchlistDB from '../data/db';


const Watchlist = () => {
  const [ movies, setMovies ] = useState([]);
  const [ category, setCategory ] = useState([]);

  const removeWatchList = (movieId, type) => {
    console.log("movie ID", movieId)
    console.log("Category", type)
    //search MovieDB
    for(let i of watchlistDB) {
      if (i.movieid === movieId && i.type === type) {
        //update the record
        i.isSelected = false;
      }
    }
    let moviesList = [];
    let categoryList = [];
    for (let i of watchlistDB) {
      const userId = Userfront.user.userId;
      if (i.userid === userId && i.isSelected) {
        moviesList.push(i.movieid);
        categoryList.push(i.type);
      } 
    }
    //use setState (setMovie)
    setMovies(moviesList);
    setCategory(categoryList);
  }

  useEffect( () => {
    const userId = Userfront.user.userId;
    let moviesList = [];
    let categoryList = [];
    for (let i of watchlistDB) {
      if (i.userid === userId && i.isSelected) {
        moviesList.push(i.movieid);
        categoryList.push(i.type);
      }
    }
    setMovies(moviesList);
    setCategory(categoryList);
  },[])

  return (
    <>
      <PageHeader />
        <div className='container'>
        <div className='section mb-3'>
        <h1>Watch List</h1>
        {
          movies.map((movie, index) => {
            let cate = category[index];
             return <MovieWatchList removeWatchList = {removeWatchList} category = {cate} id = {movie} />
          })   
        }
      </div>
      </div>
    </>
  );
};


export default Watchlist;


