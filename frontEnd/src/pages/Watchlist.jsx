import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Userfront from '@userfront/core';
import PageHeader from '../components/page-header/PageHeader';
import MovieWatchList from '../components/watchlist/MovieWatchList';
import '../components/watchlist/moviewatchlist.scss';
// import { category } from '../api/tmdbApi';

//import Watchlist from '../../components/button/Watchlist';
const watchlistDB = [
  {
    userid:15,
    movieid: 634649,
    type: 'movie',
    isSelected: true
  },
  {
    userid:15,
    movieid: 508947,
    type: 'movie',
    isSelected: true
  },
  {
    userid:15,
    movieid: 696806,
    type: 'movie',
    isSelected: true
  },
  {
    userid:15,
    movieid: 414906,
    type: 'movie',
    isSelected: true
  },
  {
    userid:15,
    movieid: 94605,
    type: 'tv',
    isSelected:true
  },
  {
    userid:15,
    movieid: 104441,
    type: 'movie',
    isSelected: true
  },
  {
    userid:7,
    movieid: 104441,
    type: 'movie',
    isSelected: true
  },
  {
    userid:6,
    movieid: 634649,
    type: 'movie',
    isSelected: true
  },
  {
    userid:6,
    movieid:52814,
    type: 'tv',
    isSelected: true
  },
  {
    userid:6,
    movieid: 573164,
    type: 'movie',
    isSelected: true
  },
  {
    userid:6,
    movieid: 453395,
    type: 'movie',
    isSelected: true
  },
  {
    userid:6,
    movieid: 94605,
    type: 'tv',
    isSelected:true
  },
  {
    userid:6,
    movieid: 629542,
    type: 'movie',
    isSelected: true
  },
  {
    userid:6,
    movieid: 338953,
    type: 'movie',
    isSelected: true
  }
]


const Watchlist = () => {
  const [ movies, setMovies ] = useState([]);
  const [ category, setCategory ] = useState([]);

  const removeWatchList = (movieId, type) => {
    console.log("movie ID", movieId)
    console.log("Category", type)
    //search MovieDB
    for(let i of watchlistDB) {
      if (i.movieid === movieId && i.type === type) {
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
    setMovies(moviesList);
    setCategory(categoryList);
    //update the record
    //use setState (setMovie)
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
             return <MovieWatchList removeWatchList = {removeWatchList} category={cate} id={movie} />
          } )   
        } 
        
      </div>
      </div>
    </>
  );
};

export default Watchlist;


