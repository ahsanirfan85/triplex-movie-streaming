import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { category } from '../../api/tmdbApi';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './moviewatchlist.scss';

// import Watchlist from '../../components/button/Watchlist';


  const MovieWatchList = (props) => {

    // const { category, id } = useParams();
    const [item, setItem] = useState(null);
    //const items  = props.item;
    

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
                            
                            <div className="movie-content2__poster">
                              <Link to={`/${props.category}/${item.id}`}>
                                <div className="movie-content2__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                              </Link>
                            </div>
                            
                            <div className="movie-content2__info">
                            <Link to={`/${props.category}/${item.id}`}>
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                </Link>
                                <h2 className="date" placeholder="Date Released: ">
                                    Release Date: {item.release_date || item.first_air_date}
                                </h2>
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
                                    <button className="btn-like-wl" onClick= {() => props.removeWatchList(props.id, props.category)}>
                                      Remove from watchlist
                                    </button>
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