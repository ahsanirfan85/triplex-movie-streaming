import { useState, useEffect } from "react";
import "./Comment.scss"
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import axios from 'axios';
import {
  // getComments as getCommentsApi,

  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
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

  const addComment = (text, parent_id) => {
    console.log(text, parent_id);
    createCommentApi(text, parent_id).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
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
        // console.log(response.data.comments);
        setBackendComments(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <div className="comments">
        <div className='comments-post'>
          <h3 className="comments-post__title">Write something</h3>
            <CommentForm submitLabel="Post" handleSubmit={ addComment } />
        </div>
        
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
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