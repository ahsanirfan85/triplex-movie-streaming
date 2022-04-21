import CommentForm from "./CommentForm";
import profilepic from "../../assets/user-icon.png"
import Userfront from "@userfront/core"

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
  
  return (
    <div key={comment.id} className="comment-posts">
      <div className="user-info">
        <div className="image_container">
          { (comment.user_id === Userfront.user.name) ?
            <img src={ Userfront.user.image } alt='' /> : <img src={ profilepic } alt='' /> }
        </div>
        <div className="comment-author">{ comment.user_id }</div>
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
