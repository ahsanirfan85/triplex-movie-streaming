import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';
import Userfront from '@userfront/react';

const Catalog = () => {

    const { category } = useParams();
    if (!Userfront.accessToken()) {
        return (
            <Redirect to={{pathname: '/login'}} />
        )
    }
    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/>
                </div>
            </div>
        </>
    );
}

export default Catalog;
