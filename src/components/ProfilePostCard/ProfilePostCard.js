import "./ProfilePostCard.css";
import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { RiCopperCoinLine } from "react-icons/ri";
import { CgSmileMouthOpen } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";

const ProfilePostCard = ({ username, userImg, totalChips, postImg }) => {
  return (
    <div className="ProfilePostCard">
      <div className="pofile_post_header">
        <Avatar alt={username} src={userImg} />
        <div className="ml-2 text-white">
          <p className="profile_short_info">{username}</p>
          <p className="profile_short_info">
            <RiCopperCoinLine /> {totalChips}
          </p>
        </div>
      </div>
      <div className="w-100">
        <img src={postImg} alt="" className="w-100" />
      </div>
      <div className="post_footer">
        <p className="mb-0">
          <span style={{ color: "#00A3FF" }}>58</span> Reacts
        </p>
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

export default ProfilePostCard;
