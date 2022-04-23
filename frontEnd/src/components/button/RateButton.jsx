import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';

export default function RateButton(props) {
  const [rating, setRating] = useState(0); // initial rating value
  const [ratingDB, setRatingDB] = useState([]);

  // Helper function to convert the result to percentage
  const calculateAverage = (totalRate, countUserRate) => {
    return totalRate / countUserRate;
  }
  
  useEffect(() => {
    axios
        .get(`http://localhost:3001/rate/${props.type}/${props.movieId}`)
        .then((response) => {
            const avgRate = calculateAverage(Number(response.data[0].total_rate), Number(response.data[0].user_rate))
            setRating(avgRate);

        })
        .catch((error) => {
            console.log(error.message);
        });
}, []);

  // Helper function to add or update rating in the database

  const addRating = (type, userId, movieId, rate) => {
    const data = {type: type, userId: userId, movieId: movieId, rate: rate}
    axios
    .post(`http://localhost:3001/rate`, {"type": type, "userId": userId, "movieId": movieId, "rate": rate})
    // .get(`http://localhost:3001/rate/${userId}/${movieId}/${type}/${rate}`)
    .then((response) => {
      console.log("All ratings by given userId: ", response.data);
      setRatingDB(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(userId, Number(movieId), rate, type)
    // const movieIds= Number(movieId)
    // let isUserRatedMovie = false;
    // for (const rate of ratingDB) {
    //   if (Number(rate.movie_id) === movieIds && Number(rate.userId) === Number(userId) && rate.type === type) {
    //     isUserRatedMovie = true;
    //     console.log(isUserRatedMovie);
    //   } 
    //   // else if (movie.movie_id === Number(movieId) && !movie.is_selected) {
    //   //   isMovieInWatchlistButFalse = true;
    //   // }
    // }
    // //   let rate = ratingDB.find(
    // //   (rate) =>
    // //     rate.movieid === Number(movieId) &&
    // //     rate.type === type &&
    // //     rate.userid === userId
    // // )
    // if (isUserRatedMovie) {
    //   axios
    //   .put(`http://localhost:3001/rate/update/${userId}/${movieId}/${rate}/${type}`)
    //   .then((response) => {
    //     console.log("Rate update response: ", response);

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // } else if (!isUserRatedMovie) {
    //   axios
    //   .put(`http://localhost:3001/rate/add/${userId}/${movieId}/${rate}/${type}`)
    //   .then((response) => {
    //     console.log("Rate add response: ", response);

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
      
    // }
  }

  // const handleRating = (ratingValue) => {
  //   console.log("Rate button is clicked", ratingValue)
  //   //setRating()
  // }

  return (
    <div className='rate-star'>
      <div className="rate-star__item">Rate it!</div>
      <Rating onClick= {(rate) => addRating(props.type, props.userId, props.movieId, rate)} ratingValue={rating} />
    </div>
  )
}