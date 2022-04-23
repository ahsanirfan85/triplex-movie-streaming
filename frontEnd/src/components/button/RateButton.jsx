import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';

export default function RateButton(props) {
  const [rating, setRating] = useState(0) // initial rating value

  // Helper function to convert the result to percentage
  const calculateAverage = (totalRate, countUserRate) => {
    return totalRate / countUserRate * 100 / 5;
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

  const handleRating = (rate) => {
    setRating(rate)
  }

  return (
    <div className='rate-star'>
      <div className="rate-star__item">Rate it!</div>
      <Rating onClick={ handleRating} ratingValue={rating} />
    </div>
  )
}