import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Moment from 'react-moment';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAction,
  fetchSinglePostAction,
} from "../../redux/slices/posts/postSlices";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import DateFormatter from "../../utils/DateFormatter";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    margin: "30px 200px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const PostDetail = (props) => {
  const { id: postId } = useParams();
  console.log("userId", postId);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifyS = (msg) => toast.success(msg);
  const notifyE = (msg) => toast.error(msg);
  const {
    postDetail,
    isLoading,
    deletedPost,
    isDeleted,
    isError,
    isSuccess,
    message,
  } = useSelector((store) => store?.post);
  const { userAuth } = useSelector((store) => store?.users);
  console.log("userAuth", userAuth);
  const loggedInUser = userAuth?.user?.id;

  const postCreatedByUser = postDetail?.post?.user?._id === loggedInUser;
  console.log("postCreatedByUser", postCreatedByUser);
  console.log("delete post", deletedPost);
  const post = postDetail?.post;
  console.log("isDeleted", isDeleted);

  const comments = postDetail?.post?.comments;

  useEffect(() => {
    dispatch(fetchSinglePostAction(postId));
  }, [dispatch, postId]);

  // setTimeout(() => {
  //   navigate("/category-list");
  // }, 1000);

  // const isPostDeleted = post.filter((p) => p._id !== postId);
  // console.log("isPostDeleted",isPostDeleted)

  // if(deletedPost?.post === null) {
  //   setTimeout(() => {
  //   navigate("/posts");
  // }, 1000);
  // }

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Card className={classes.root}>
          <CardHeader
            avatar={<Avatar alt="Remy Sharp" src={post?.user?.profilePhoto} />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post?.user.name}
            subheader={<DateFormatter date={post?.createdAt} />}
          />
          <CardMedia
            className={classes.media}
            image={post?.image}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="h5" color="textSecondary">
              {post?.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {post?.description}
            </Typography>

            <Typography>Post comments</Typography>
            <ul>
              {comments?.length <= 0 ? (
                <h1>no comments</h1>
              ) : (
                comments?.map((comment) => (
                  <>
                    <li>
                      <div>
                        <Avatar
                          alt="Remy Sharp"
                          src={comment?.user?.profilePhoto}
                        />
                         <Typography variant="small">{comment?.user?.name}</Typography>
                         <Typography>
                         {/* <DateFormatter date= /> */}
                         <Moment fromNow ago>
                         {comment?.createdAt}
                         </Moment>
                         </Typography>
                         <Typography>
                          {comment?.description}
                         </Typography>
                        <div>
                         
                        </div>
                      </div>
                    </li>
                  </>
                ))
              )}
            </ul>
          </CardContent>
          {/* show delete update functionalities if the post belong to them */}

          {postCreatedByUser ? (
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Link to={`/update-post/${post?._id}`}>
                  <EditIcon />
                </Link>
              </IconButton>
              <IconButton aria-label="share">
                <DeleteIcon
                  onClick={() => dispatch(deletePostAction(post?._id))}
                />
              </IconButton>
            </CardActions>
          ) : null}
        </Card>
      )}
    </>
  );
};
export default PostDetail;
