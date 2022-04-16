import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                {/* <div className="movie-card__content">
                </div> */}
            </div>
            <h4>{item.title || item.name}</h4>
        </Link>
    );
}

export default MovieCard;
