import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './moviewatchlist.scss';
import CastList from '../../pages/detail/CastList';

import Watchlist from '../../components/button/Watchlist';
import RateButton from '../../components/button/RateButton';


  const MovieWatchList = (props) => {

    // const { category, id } = useParams();
  
    const [item, setItem] = useState(null);
  
    console.log(props)
        useEffect(() => {
          const getDetail = async () => {
            const response = await tmdbApi.detail(props.category, props.id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
          }
          getDetail();
      }, [props.category, props.id]);

      return (
    <>
        {
                item && (
                    <>
                        <div className="mb-3 movie-content2 container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={ item.id } />
                                    <div className='social'>
                                        <Watchlist />
                                        <RateButton />
                                    </div>
                                    <div className='button-link'>
                                        <Link to="/movieplay" className='social__link'>Play Now!</Link>
                                        <Link to="/forums" className='social__link'>Discussion Forum</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                )
            }
    </>
  )
}
export default MovieWatchList;