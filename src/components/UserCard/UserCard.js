import './UserCard.css';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import { RiCopperCoinLine } from "react-icons/ri";
import { useHistory } from 'react-router-dom';
import noProfileImg from '../../images/no-profile.png';
import { UserContext } from '../../App';
import Typography from '@material-ui/core/Typography';

const UserCard = ({ user, setAllUsers }) => {
  const history = useHistory()
  const [loggedInUser] = useContext(UserContext)
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    const result = user.followers.find(follower => follower === loggedInUser._id)
    if (result !== undefined) setFollowed(true)
  }, [user])

  const followUser = (userId) => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/followUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ following: userId, followBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users`)
          .then(res => res.json())
          .then(data => setAllUsers(data))
      })
  }

  const unFollowUser = (userId) => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/unFollowUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unFollowing: userId, unFollowBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users`)
          .then(res => res.json())
          .then(data => {
            setAllUsers(data)
            setFollowed(false)
          })
      })
  }

  return (
    <div className="UserCard">
      <div className="user_short_info" onClick={() => history.push(`/profile/${user._id}`)}>
        {
          user.profileImg === "" ?
            <Avatar alt={user.fullname} src={noProfileImg} className="user_card_avater" /> :
            <Avatar alt={user.fullname} src={user.profileImg} className="user_card_avater" />
        }
        <div className="ml-2" style={{minWidth: 0}}>
          <Typography noWrap className="mb-0">{user.fullname}</Typography>
          <p className="mb-0"><span style={{ color: '#00A3FF' }}>{user.followers?.length}</span> Follower</p>
        </div>
      </div>
      <div className="user_chips">
        <p className="text-center mb-0"><RiCopperCoinLine /> {user.chips}</p>
      </div>
      <div className="user_join_footer">
        {
          followed ?
            <Button
              variant="contained"
              size="small"
              disabled={loggedInUser._id === user._id ? true : false}
              color="secondary"
              className="mx-auto my-2 d-block"
              onClick={() => unFollowUser(user._id)}
            >Following</Button> :
            <Button
              variant="contained"
              size="small"
              disabled={loggedInUser._id === user._id ? true : false}
              color="primary"
              className="mx-auto my-2 d-block"
              onClick={() => followUser(user._id)}
            >Follow</Button>
        }


        <p className="text-center">Joined {moment(user.joiningDate).format('DD MMM YYYY')}</p>
      </div>
    </div>
  );
};

export default UserCard;