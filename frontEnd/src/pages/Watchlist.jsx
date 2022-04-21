import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Userfront from '@userfront/core';
import PageHeader from '../components/page-header/PageHeader';
import MovieWatchList from '../components/watchlist/MovieWatchList';
import '../components/watchlist/moviewatchlist.scss';
// import { category } from '../api/tmdbApi';

//import Watchlist from '../../components/button/Watchlist';
// const watchlistDB = [
//   {
//     userid:15,
//     movieid: 634649,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:15,
//     movieid: 508947,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:15,
//     movieid: 696806,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:15,
//     movieid: 414906,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:15,
//     movieid: 94605,
//     type: 'tv',
//     isSelected:true
//   },
//   {
//     userid:15,
//     movieid: 104441,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:7,
//     movieid: 104441,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:6,
//     movieid: 634649,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:6,
//     movieid:52814,
//     type: 'tv',
//     isSelected: true
//   },
//   {
//     userid:6,
//     movieid: 573164,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:6,
//     movieid: 453395,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:6,
//     movieid: 94605,
//     type: 'tv',
//     isSelected:true
//   },
//   {
//     userid:6,
//     movieid: 629542,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:6,
//     movieid: 338953,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:12,
//     movieid: 634649,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:12,
//     movieid: 508947,
//     type: 'movie',
//     isSelected: true
//   },
//   {
//     userid:12,
//     movieid: 696806,
//     type: 'movie',
//     isSelected: true
//   },
// ]


const Watchlist = () => {
  const [ watchlistDB, setWatchlistDB ] = useState([]);

  const removeWatchList = (movieId, type) => {
    console.log("movie ID", movieId)
    console.log("Category", type)
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
    //update the record
    //use setState (setMovie)
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
        <h1>Watch List</h1>
        {
          watchlistDB.map((movie, index) => {
            if (movie.user_id === Userfront.user.userId && movie.is_selected) {
              return <MovieWatchList key={index} removeWatchList = {removeWatchList} category={movie.type} id={movie.movie_id} />              
            }
          } )   
        } 
        
      </div>
      </div>
    </>
  );
};

export default Watchlist;


