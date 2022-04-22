import { useState, useEffect } from "react";
import "./Comment.scss"
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import axios from 'axios';
import {
  // getComments as getCommentsApi,

  createComment as createCommentApi,
  // updateComment as updateCommentApi,
  // deleteComment as deleteCommentApi,
} from "../../api";

const Comments = ({ category, id, currentUserId }) => {

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent_id === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text, category, movie_id, user_id, parent_id) => {
    // console.log(text, parent_id);
    // createCommentApi(text, parent_id).then((comment) => {
    //   console.log(comment);
    //   setBackendComments([comment, ...backendComments]);
    //   setActiveComment(null);
    // });
    console.log(text);
    console.log(category);
    console.log(movie_id);
    console.log(user_id);
    console.log(parent_id);
    axios
      .post(`http://localhost:3001/posts/${category}/${parent_id}/${movie_id}/${user_id}`, text)
      .then((response) => {
        console.log(response.data);
        setBackendComments(response.data);
        setActiveComment(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const updateComment = (text, commentId) => {
    // updateCommentApi(text).then(() => {
    //   const updatedBackendComments = backendComments.map((backendComment) => {
    //     if (backendComment.id === commentId) {
    //       return { ...backendComment, body: text };
    //     }
    //     return backendComment;
    //   });
    //   setBackendComments(updatedBackendComments);
    //   setActiveComment(null);
    // });
    axios
      .put(`http://localhost:3001/posts/update/${commentId}`, text)
      .then((response) => {
        console.log(response.data);
        setBackendComments(response.data);
        setActiveComment(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
    ;
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      // deleteCommentApi().then(() => {
      //   const updatedBackendComments = backendComments.filter(
      //     (backendComment) => backendComment.id !== commentId
      //   );
      //   setBackendComments(updatedBackendComments);
      // });
      axios
        .delete(`http://localhost:3001/posts/${commentId}`)
        .then((response) => {
          console.log(response.data);
          setBackendComments(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });
    
    axios
      .get(`http://localhost:3001/posts/${category}/${id}`)
      .then((response) => {
        console.log(response.data);
        setBackendComments(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [ id, category ]);

  return (
    <>
      <div className="comments">
        <div className='comments-post'>
            <CommentForm user_id={currentUserId} comment_id={null} category={category} movie_id={id} submitLabel="Create Post" handleSubmit={ addComment } />
        </div>
        
        <div className="comments-container">
          {rootComments.map((rootComment) => (
            <Comment
              category={category}
              movie_id={id}
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;


//create comment fn with the movie id