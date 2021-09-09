import './PostCard.css';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { CgSmileMouthOpen } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { UserContext } from '../../App';
import { useHistory } from 'react-router';



const PostCard = ({ post, useremail, setallPosts }) => {
  const history = useHistory()
  const [loggedInUser] = useContext(UserContext)
  const [postUserInfo, setPostUserInfo] = useState({})
  const [liked, setLiked] = useState(false)
  const [disLiked, setDisLiked] = useState(false)

  useEffect(() => {
    const isLiked = post.likes.find(userId=> userId === loggedInUser._id)
    if (isLiked?.length > 0) setLiked(true)
    const isDisliked = post.dislikes.find(userId => userId === loggedInUser._id)
    if (isDisliked?.length > 0) setDisLiked(true)
  }, [])

  useEffect(() => {
    fetch(`http://localhost:5000/api/usersmail/${useremail}`)
      .then(res => res.json())
      .then(data => setPostUserInfo(data[0]))
  }, [useremail])

  const likePost = (postId)=> {
    fetch(`http://localhost:5000/api/likePost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({likedPost: postId, likedBy: loggedInUser._id})
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/api/allPosts`)
          .then(res => res.json())
          .then(data => {
            setallPosts(data.reverse())
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
            setallPosts(data.reverse())
            setLiked(false)
            setDisLiked(true)
          })
      })
  }


  return (
    <div className="PostCard">
      <div className="post_header">
        <div className="poster_info">
          <Avatar
            alt={postUserInfo?.fullname}
            src={`data:image/png;base64,${postUserInfo.profileImg?.img}`}
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`/profile/${postUserInfo._id}`)}
          />
          <div className="ml-2 text-white">
            <p className="profile_short_info">{postUserInfo?.fullname}</p>
            <p className="profile_short_info"><span className="text-primary">{postUserInfo?.followers?.length}</span> Followers</p>
          </div>
        </div>
      </div>
      <div className="w-100">
        <img src={`data:image/png;base64,${post.postImg?.img}`} alt="" className="w-100" />
      </div>
      <div className="post_footer">
        <p className="mb-0"><span style={{ color: '#00A3FF' }}>{post.likes?.length + post.dislikes?.length}</span> Reacts</p>
        {
          loggedInUser.email &&
          <div className="react_btn_container">
            <IconButton 
              size="small" 
              onClick={()=> likePost(post._id)}
              disabled={loggedInUser._id === postUserInfo._id ? true : liked ? true : false} 
            >
              <CgSmileMouthOpen className={liked ? 'react_btn text-success' : 'react_btn'} />
            </IconButton>

            <IconButton 
              size="small" 
              onClick={()=> dislikePost(post._id)}
              disabled={loggedInUser._id === postUserInfo._id ? true : disLiked ? true : false}
            >
              <CgSmileSad className={disLiked ? 'react_btn text-danger' : 'react_btn'} />
            </IconButton>
          </div>
        }
      </div>
    </div>
  );
};

export default PostCard;