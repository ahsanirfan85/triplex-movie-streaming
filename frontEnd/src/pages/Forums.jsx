// import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Comments from "../components/comments/Comments";
import PageHeader from '../components/page-header/PageHeader';
// import apiConfig from '../api/apiConfig';
// import tmdbApi from '../api/tmdbApi';
import Userfront from "@userfront/core"

const Forums = () => {

    const { category, id } = useParams();
    // const [item, setItem] = useState(null);


    // useEffect(() => {
    //     const getDetail = async () => {
    //         const response = await tmdbApi.detail(category, id, {params:{}});
    //         setItem(response);
    //         window.scrollTo(0,0);
    //     }
    //     getDetail();
    // }, [category, id]);


    return (
    <>
      <PageHeader />
      <div className="comments__header">
          <h1>Discussion Forum</h1>
        </div>
        <div className="content-wrapper">
          <Comments
            currentUserId={ Userfront.user.name }
            category={ category }
            id={ id } />
      </div>
    </>
  );
};

export default Forums;
