import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Userfront from '@userfront/core';
import RequireAuth from '../../components/Login/RequireAuth';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import WatchList from '../../components/button/Watchlist';
import RateButton from '../../components/button/RateButton';
import axios from 'axios';

const Detail = (props) => {

    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    const [label, setLabel] = useState('');
    
    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/watchlist/${Userfront.user.userId}/${category}/${id}`)
            .then((response) => {
                setLabel(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <>
            <RequireAuth>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name} 
                                </h1>
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
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={ item.id } />
                                    <div className='social'>
                                        <WatchList label={label} userId={Userfront.user.userId} type = {category} movieId = {id} />

                                        <RateButton type = {category} movieId = {id} userId={Userfront.user.userId} />
                                    </div>
                                    <div className='button-link'>
                                        <Link to="/movieplay" className='social__link'>Play Now!</Link>
                                        <Link to={`/forums/${category}/${id}`} className='social__link'>Discussion Forum</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <div className="section__details mb-2">
                                    <h2>More Trailers</h2>
                                    <div className="section__trailer mb-3">
                                        <VideoList id={item.id}/>
                                    </div>
                                </div>
                                <h2>More Like This</h2>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div> 
                        </div>
                    </>
                )
            }
            </RequireAuth>
        </>
    );
}

export default Detail;
