import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function MyComponent() {
  const [rating, setRating] = useState(0) // initial rating value

  const handleRating = (rate) => {
    setRating(rate)
  }
  

  return (
    <div className='rate-star'>
      <div className="rate-star__item">Rate it!</div>
      <Rating onClick={ handleRating } ratingValue={ rating } />
    </div>
  )
}