// import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Comments from "../components/comments/Comments";
import PageHeader from '../components/page-header/PageHeader';
import Userfront from '@userfront/core';
// import apiConfig from '../api/apiConfig';
// import tmdbApi from '../api/tmdbApi';

const Forums = () => {

  const { category, id } = useParams();
  console.log(category, id);



    return (
    <>
      <PageHeader />
        
        <div className="main-wrapper">
            <div className="comments__header"><h1>Discussion Forum</h1></div>
            <div className="content-wrapper">
            <Comments category={ category } id={ id } currentUserId={ Userfront.user.userId } />
          </div>
        </div>
    </>
  );
};

export default Forums;
