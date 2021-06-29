import './UserCard.css';
import React from 'react';
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import taslimImg from '../../images/taslim.png';
import { RiCopperCoinLine } from "react-icons/ri";

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

const UserCard = () => {
  const classes = useStyles();

  return (
    <div className="UserCard">
      <div className="user_short_info">
        <Avatar alt="Taslim Khaled" src={taslimImg} style={{width: '60px', height: '60px'}}/>
        <div className="ml-2 text-white">
          <p className="mb-0">Taslim Khaled</p>
          <p className="mb-0"><span style={{ color: '#00A3FF' }}>58</span> Follower</p>
        </div>
      </div>
      <div className="user_chips">
        <p className="text-center mb-0"><RiCopperCoinLine /> 1035503</p>
      </div>
      <div className="user_join_footer">
        <Button variant="contained" size="small" className={classes.followBtn}>Follow</Button>
        <p className="text-center">Joined 09/06/2021</p>
      </div>
    </div>
  );
};

export default UserCard;