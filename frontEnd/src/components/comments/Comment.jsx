import CommentForm from "./CommentForm";
import profilepic from "../../assets/user-icon.png"
<<<<<<< HEAD
import Userfront from "@userfront/core"
=======
import { useEffect, useState } from "react";
import axios from "axios";
>>>>>>> axios-watchlist

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parent_id = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
<<<<<<< HEAD
  // const fiveMinutes = 300000;
  // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.user_id && replies.length === 0;
    // currentUserId === comment.user_id && replies.length === 0 && !timePassed;
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment.user_id;
    // const canEdit = currentUserId === comment.user_id && !timePassed;
  const replyId = parent_id ? parent_id : comment.id;
  // const createdAt = new Date(comment.createdAt).toLocaleDateString();
  
=======
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.created_at) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.created_at).toLocaleDateString();
  const [commenterName, setCommenterName] = useState('');

  const [canDelete, setCanDelete] = useState(false);
    //currentUserId === comment.user_id && replies.length === 0 && !timePassed;
  const [canEdit, setCanEdit] = useState(false)//currentUserId === comment.user_id && !timePassed;

  console.log(`${currentUserId} ${comment.user_id} ${currentUserId === comment.user_id}`);
  
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.userfront.com/v0/users/${comment.user_id}`,
      headers: {
        authorization: 'Bearer uf_test_admin_9ny8z7vb_dc8b743dbd8a09e5bc7289e758bb4f5d'
      }
    })
      .then((response) => {
        console.log(response.data.name);
        setCommenterName(response.data.name);
        if (currentUserId === comment.user_id) {
          setCanDelete(true);
          setCanEdit(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

>>>>>>> axios-watchlist
  return (
    <div key={comment.id} className="comment-posts">
      <div className="user-info">
        <div className="image_container">
          { (comment.user_id === Userfront.user.name) ?
            <img src={ Userfront.user.image } alt='' /> : <img src={ profilepic } alt='' /> }
        </div>
<<<<<<< HEAD
        <div className="comment-author">{ comment.user_id }</div>
=======
        <div className="comment-author">{ commenterName }</div>
        <div className='comment-date'>{createdAt}</div>
>>>>>>> axios-watchlist
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
          submitLabel="Update"
          hasCancelButton
          initialText={comment.body}
          handleSubmit={(text) => updateComment(text, comment.id)}
          handleCancel={() => {
            setActiveComment(null);
          }}
          />
          )}
          </div>
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={ () => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parent_id={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
