import './UserCard.css';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RiCopperCoinLine } from "react-icons/ri";
import { useHistory } from 'react-router-dom';
import noProfileImg from '../../images/no-profile.png';
import { UserContext } from '../../App';

const useStyles = makeStyles({
  followBtn: {
    backgroundColor: '#00A3FF',
    color: "#fff",
    fontWeight: 700,
    textTransform: 'capitalize',
    margin: '10px auto',
    display: 'block',
    "&:hover": {
      backgroundColor: '#0087d3'
    }
  },
  followingBtn: {
    backgroundColor: '#EEFE3B',
    fontWeight: 700,
    textTransform: 'capitalize',
    margin: '10px auto',
    display: 'block',
    "&:hover": {
      backgroundColor: '#becf00'
    }
  }
})

const UserCard = ({user, setAllUsers}) => {
  const classes = useStyles()
  const history = useHistory()
  const [loggedInUser] = useContext(UserContext)
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    const result = user.followers.find(follower => follower === loggedInUser._id)
    if (result !== undefined) setFollowed(true)
  }, [user])

  const followUser = (userId) => {
    fetch(`http://localhost:5000/api/followUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ following: userId, followBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/api/users`)
          .then(res => res.json())
          .then(data => {
            const users = data.filter(user => user.email !== loggedInUser.email)
            setAllUsers(users)
          })
      })
  }

  const unFollowUser = (userId) => {
    fetch(`http://localhost:5000/api/unFollowUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ unFollowing: userId, unFollowBy: loggedInUser._id})
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/api/users`)
          .then(res => res.json())
          .then(data => {
            const users = data.filter(user => user.email !== loggedInUser.email)
            setAllUsers(users)
            setFollowed(false)
          })
      })
  }
  
  return (
    <div className="UserCard">
      <div className="user_short_info" onClick={() => history.push(`/profile/${user._id}`)}>
        {
          user.profileImg?.img === undefined ?
            <Avatar alt={user.fullname} src={noProfileImg} style={{ width: '60px', height: '60px' }} /> :
            <Avatar alt={user.fullname} src={`data:image/png;base64,${user.profileImg?.img}`} style={{ width: '60px', height: '60px' }} />
        }
        <div className="ml-2 text-white">
          <p className="mb-0">{user.fullname}</p>
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
              className={classes.followingBtn}
              onClick={() => unFollowUser(user._id)}
            >Following</Button> : 
            <Button
              variant="contained"
              size="small"
              className={classes.followBtn}
              onClick={() => followUser(user._id)}
            >Follow</Button>
        }
        

        <p className="text-center">Joined {moment(user.joiningDate).format('DD MMM YYYY')}</p>
      </div>
    </div>
  );
};

export default UserCard;