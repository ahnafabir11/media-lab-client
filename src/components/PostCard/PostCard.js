import './PostCard.css';
import React from 'react'; 
import { Avatar, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RiCopperCoinLine } from "react-icons/ri";
import { CgSmileMouthOpen } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";

const useStyles = makeStyles({
  followBtn: {
    backgroundColor: '#00A3FF',
    color: "#fff",
    fontWeight: 700,
    textTransform: 'capitalize',
    "&:hover": {
      backgroundColor: '#0087d3'
    } 
  }, 
  followingBtn: {
    backgroundColor: '#EEFE3B', 
    fontWeight: 700,
    textTransform: 'capitalize',
    "&:hover": {
      backgroundColor: '#becf00'
    }
  }
})

const PostCard = ({username, userImg, totalChips, followStatus, postImg}) => {
  const classes = useStyles();

  return (
    <div className="PostCard">
      <div className="post_header">
        <div className="poster_info">
          <Avatar alt={username} src={userImg} />
          <div className="ml-2 text-white">
            <p className="profile_short_info">{username}</p>
            <p className="profile_short_info"><RiCopperCoinLine /> {totalChips}</p>
          </div>
        </div>
        <div className="follow_status">
          <Button variant="contained" size="small" className={classes.followBtn}>Follow</Button>
        </div>
      </div>
      <div className="w-100">
        <img src={postImg} alt="" className="w-100" />
      </div>
      <div className="post_footer">
        <p className="mb-0"><span style={{ color: '#00A3FF'}}>58</span> Reacts</p>
        <div className="react_btn_container">
          <IconButton size="small">
            <CgSmileMouthOpen className="react_btn text-success" />
          </IconButton>
          <IconButton size="small">
            <CgSmileSad className="react_btn text-danger" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PostCard;