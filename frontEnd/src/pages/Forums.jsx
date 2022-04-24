import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comments from "../components/comments/Comments";
import PageHeader from "../components/page-header/PageHeader";
import Userfront from "@userfront/core";
import RequireAuth from "../components/Login/RequireAuth";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";

const Forums = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    item && (
      <>
        {/* <PageHeader /> */}
        <RequireAuth>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
                                      <div className="movie-title">
                                <h1 className="title-movie">
                                    {item.title || item.name} 
                                </h1>
                                </div>
                                </div>
          <div className="main-wrapper">
            <div className="comments__header">
              <h1>Discussion Forum</h1>
            </div>
            <div className="content-wrapper">
              <Comments
                category={category}
                id={id}
                currentUserId={Userfront.user.userId}
              />
            </div>
          </div>
        </RequireAuth>
      </>
    )
  );
};

export default Forums;
