import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Userfront from '@userfront/core';
import PageHeader from '../components/page-header/PageHeader';
import MovieWatchList from '../components/watchlist/MovieWatchList';

//import Watchlist from '../../components/button/Watchlist';
const watchlistDB = [
  {
    userid:6,
    movieid: 634649,
    isSelected: true
  },
  {
    userid:6,
    movieid: 508947,
    isSelected: true
  },
  {
    userid:6,
    movieid: 696806,
    isSelected: true
  },
  {
    userid:6,
    movieid: 414906,
    isSelected: true
  },
  {
    userid:7,
    movieid: 104441,
    isSelected: true
  },
  {
    userid:7,
    movieid: 104441,
    isSelected: true
  }
]
const userId = Userfront.user.userId;
let movies = [];
for (let i of watchlistDB) {
  if (i.userid === userId && i.isSelected) {
    movies.push(i.movieid)
  }
}

const Watchlist = () => {
  return (
    <>
        <div className='container'>
        <div className='section mb-3'>
          <PageHeader />
        <h1>All the Movies in the Watch List</h1>
        {
          movies.map(movie => (
             <MovieWatchList category={"movie"} id={movie} />
           ) )   
        } 
        
      </div>
      </div>
    </>
  );
};

export default Watchlist;


