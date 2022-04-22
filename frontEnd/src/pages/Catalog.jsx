import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';
import RequireAuth from '../components/Login/RequireAuth';

const Catalog = () => {
    const { category } = useParams();
    return (
        <>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Series'}
            </PageHeader>
            <RequireAuth>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/>
                </div>
            </div>
            </RequireAuth>
        </>
    );
}

export default Catalog;
