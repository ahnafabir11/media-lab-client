import "./ProfilePostCard.css";
import React, { useContext, useEffect, useState } from "react";
import moment from 'moment';
import { Avatar, IconButton } from "@material-ui/core";
import { CgSmileMouthOpen } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { UserContext } from "../../App";

const ProfilePostCard = ({ username, userImg, postImg, postDate, userPost, userEmail, setUserPosts }) => {
  const [loggedInUser] = useContext(UserContext)
  const [liked, setLiked] = useState(false)
  const [disLiked, setDisLiked] = useState(false)

  useEffect(() => {
    const isLiked = userPost.likes.find(userId => userId === loggedInUser._id)
    if (isLiked?.length > 0) setLiked(true)
    const isDisliked = userPost.dislikes.find(userId => userId === loggedInUser._id)
    if (isDisliked?.length > 0) setDisLiked(true)
  }, [])

  const likePost = (postId) => {
    fetch(`http://localhost:5000/api/likePost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likedPost: postId, likedBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/api/allPosts`)
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
    fetch(`http://localhost:5000/api/dislikePost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dislikedPost: postId, dislikedBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/api/allPosts`)
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
        <Avatar alt={username} src={`data:image/png;base64,${userImg}`} />
        <div className="ml-2 text-white">
          <p className="profile_short_info">{username}</p>
          <p className="profile_short_info" style={{ color: "#00A3FF" }}>{moment(postDate).format('DD MMM YYYY')}</p>
        </div>
      </div>
      <div className="w-100">
        <img src={`data:image/png;base64,${postImg}`} alt="" className="w-100" />
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
    </div>
  );
};

export default ProfilePostCard;
