import "./ProfilePostCard.css";
import moment from 'moment';
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { CgSmileMouthOpen } from "react-icons/cg";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CgSmileSad } from "react-icons/cg";
import { UserContext } from "../../App";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const ProfilePostCard = ({ username, userImg, userPost, userEmail, setUserPosts }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [loggedInUser] = useContext(UserContext)
  const [liked, setLiked] = useState(false)
  const [disLiked, setDisLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const deletePost = () => {
    setAnchorEl(null)
    setLoading(true)
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/deletePost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: userPost._id, public_id: userPost.public_id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`https://mysterious-sierra-15948.herokuapp.com/api/allPosts`)
          .then(res => res.json())
          .then(data => {
            const userPosts = data.reverse().filter(posts => posts.email === userEmail)
            setUserPosts(userPosts)
            setLoading(false)
          })
      })
  }

  useEffect(() => {
    const isLiked = userPost.likes.find(userId => userId === loggedInUser._id)
    if (isLiked?.length > 0) setLiked(true)
    const isDisliked = userPost.dislikes.find(userId => userId === loggedInUser._id)
    if (isDisliked?.length > 0) setDisLiked(true)
  }, [])

  const likePost = (postId) => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/likePost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likedPost: postId, likedBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`https://mysterious-sierra-15948.herokuapp.com/api/allPosts`)
          .then(res => res.json())
          .then(data => {
            const userPosts = data.reverse().filter(posts => posts.email === userEmail)
            setUserPosts(userPosts)
            setLiked(true)
            setDisLiked(false)
          })
      })
  }

  const dislikePost = (postId) => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/dislikePost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dislikedPost: postId, dislikedBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`https://mysterious-sierra-15948.herokuapp.com/api/allPosts`)
          .then(res => res.json())
          .then(data => {
            const userPosts = data.reverse().filter(posts => posts.email === userEmail)
            setUserPosts(userPosts)
            setLiked(false)
            setDisLiked(true)
          })
      })
  }

  return (
    <div className="ProfilePostCard">
      <div className="pofile_post_header">
        <div className="pofile_post_header_left">
          <Avatar alt={username} src={userImg} />
          <div className="ml-2 text-white">
            <p className="profile_short_info">{username}</p>
            <p className="profile_short_info" style={{ color: "#00A3FF" }}>{moment(userPost.uploadDate).format('DD MMM YYYY')}</p>
          </div>
        </div>

        {
          loggedInUser.email === userEmail &&
          <div>
            <IconButton
              aria-controls="profile-post-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <BsThreeDotsVertical color="white" />
            </IconButton>

            <Menu
              keepMounted
              id="profile-post-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={deletePost} className="text-danger">Delete</MenuItem>
            </Menu>
          </div>
        }
      </div>
      <div className="w-100">
        <img src={userPost.postImg} alt="" className="w-100" />
      </div>
      <div className="post_footer">
        <p className="mb-0">
          <span style={{ color: "#00A3FF" }}>{userPost.likes?.length + userPost.dislikes?.length}</span> Reacts
        </p>
        <div className="react_btn_container">
          <IconButton size="small" disabled={loggedInUser.email === userEmail ? true : liked ? true : false} onClick={() => likePost(userPost._id)}>
            <CgSmileMouthOpen className={liked ? 'react_btn text-success' : 'react_btn'} />
          </IconButton>
          <IconButton size="small" disabled={loggedInUser.email === userEmail ? true : disLiked ? true : false} onClick={() => dislikePost(userPost._id)}>
            <CgSmileSad className={disLiked ? 'react_btn text-danger' : 'react_btn'} />
          </IconButton>
        </div>
      </div>

      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
};

export default ProfilePostCard;
