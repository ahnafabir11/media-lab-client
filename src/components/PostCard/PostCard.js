import './PostCard.css';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { CgSmileMouthOpen } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { UserContext } from '../../App';
import { useHistory } from 'react-router';



const PostCard = ({ post, setAllPosts }) => {
  const history = useHistory()
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [postUserInfo, setPostUserInfo] = useState({})
  const [liked, setLiked] = useState(false)
  const [disLiked, setDisLiked] = useState(false)

  useEffect(() => {
    const isLiked = post.likes.find(userId => userId === loggedInUser._id)
    if (isLiked?.length > 0) setLiked(true)
    const isDisliked = post.dislikes.find(userId => userId === loggedInUser._id)
    if (isDisliked?.length > 0) setDisLiked(true)
  }, [])

  useEffect(() => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/usersmail/${post.email}`)
      .then(res => res.json())
      .then(data => setPostUserInfo(data[0]))
  }, [post.email])

  const likePost = (postId) => {
    const onceLiked = post.likes.find(userId => userId === loggedInUser._id)
    const oncedisLiked = post.dislikes.find(userId => userId === loggedInUser._id)

    if (onceLiked === undefined && oncedisLiked === undefined) {
      fetch(`https://mysterious-sierra-15948.herokuapp.com/api/likePost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likedPost: postId, likedBy: loggedInUser._id })
      })
        .then(res => res.json())
        .then(data => {
          const totalChips = loggedInUser.chips + 10;
          fetch(`https://mysterious-sierra-15948.herokuapp.com/api/updateProfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: loggedInUser._id, chips: totalChips }),
          })
            .then(res => res.json())
            .then(data => {
              setLoggedInUser(data)
              fetch(`https://mysterious-sierra-15948.herokuapp.com/api/allPosts`)
                .then(res => res.json())
                .then(data => {
                  setAllPosts(data.reverse())
                  setLiked(true)
                  setDisLiked(false)
                })
            })
        })
    } else {
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
              setAllPosts(data.reverse())
              setLiked(true)
              setDisLiked(false)
            })
        })
    }
  }

  const dislikePost = (postId) => {
    const onceLiked = post.likes.find(userId => userId === loggedInUser._id)
    const oncedisLiked = post.dislikes.find(userId => userId === loggedInUser._id)

    if (onceLiked === undefined && oncedisLiked === undefined) {
      fetch(`https://mysterious-sierra-15948.herokuapp.com/api/dislikePost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dislikedPost: postId, dislikedBy: loggedInUser._id })
      })
        .then(res => res.json())
        .then(data => {
          const totalChips = loggedInUser.chips + 10;
          fetch(`https://mysterious-sierra-15948.herokuapp.com/api/updateProfile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: loggedInUser._id, chips: totalChips }),
          })
            .then(res => res.json())
            .then(data => {
              setLoggedInUser(data)
              fetch(`https://mysterious-sierra-15948.herokuapp.com/api/allPosts`)
                .then(res => res.json())
                .then(data => {
                  setAllPosts(data.reverse())
                  setLiked(false)
                  setDisLiked(true)
                })
            })
        })
    } else {
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
              setAllPosts(data.reverse())
              setLiked(false)
              setDisLiked(true)
            })
        })
    }
  }


  return (
    <div className="PostCard">
      <div className="post_header">
        <div className="poster_info">
          <Avatar
            alt={postUserInfo?.fullname}
            src={postUserInfo.profileImg}
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
        <img src={post.postImg} alt="" className="w-100" />
      </div>
      <div className="post_footer">
        <p className="mb-0"><span style={{ color: '#00A3FF' }}>{post.likes?.length + post.dislikes?.length}</span> Reacts</p>
        {
          loggedInUser.email &&
          <div className="react_btn_container">
            <IconButton
              size="small"
              onClick={() => likePost(post._id)}
              disabled={loggedInUser._id === postUserInfo._id ? true : liked ? true : false}
            >
              <CgSmileMouthOpen className={liked ? 'react_btn text-success' : 'react_btn'} />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => dislikePost(post._id)}
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