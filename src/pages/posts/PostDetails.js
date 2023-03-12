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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePostAction } from "../../redux/slices/posts/postSlices";
import { Routes, Route, useParams, Link } from "react-router-dom";
import DateFormatter from "../../utils/DateFormatter";
import { CircularProgress } from "@material-ui/core";

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
  const { postDetail,isLoading } = useSelector((store) => store?.post);
  console.log("postDetail");
  const post = postDetail?.post;
  console.log("post", post);

  useEffect(() => {
    dispatch(fetchSinglePostAction(postId));
  }, [dispatch, postId]);

  return (
    <>
    { isLoading ? (<CircularProgress/>): (
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src={post?.user?.profilePhoto
          } />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.user.name}
        subheader={<DateFormatter date={post?.createdAt}/>}
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        <Link to={`/update-post/${post?._id}`}>
                        <EditIcon />
                      </Link>
        </IconButton>
        <IconButton aria-label="share">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
    )}
    </>
   
  );
};
export default PostDetail;
