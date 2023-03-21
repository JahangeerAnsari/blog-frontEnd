import React, { useEffect, useState } from 'react'
import MoodIcon from "@material-ui/icons/Mood";
import { addCommentToPostAction, getAllPostsCommentsAction } from "../../redux/slices/comment/commentSlice";
import { useDispatch, useSelector } from 'react-redux';
const Comment = (props) => {
  const dispatch = useDispatch();
  const {postId} = props;
  const [commentDesc, setCommentDesc] = useState("");
  const {postComments,allComments} = useSelector((store) => store?.comment);
  console.log("comments", allComments);
  console.log("commentDesc",commentDesc)

  // useEffect(() => {
  //   dispatch(getAllPostsCommentsAction());
  // }, [dispatch,]);
  const handleCommentFormSubmit = (e) =>{
    e.preventDefault();
    const data = {
      postId, commentDesc
    }
     dispatch(addCommentToPostAction(data));
     setCommentDesc("")
   }
  return (
    <div className="comment-section">
      <div className="add-comment">
                    <span>
                      <MoodIcon />
                    </span>
                    <form onSubmit={handleCommentFormSubmit}>
                      <input
                        type="text"
                        value={commentDesc}
                        onChange={(e) => setCommentDesc(e.target.value)}
                        placeholder="enter comment"
                      />
                      <button className="comment" type="submit">
                        add comment
                      </button>
                    </form>
                   
                  </div>


    </div>
  )
}

export default Comment