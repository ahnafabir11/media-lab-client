import "./Profile.css";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RiCopperCoinLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import ProfilePostCard from "../../components/ProfilePostCard/ProfilePostCard";

import taslimImg from "../../images/taslim.png";
import postImg from "../../images/post-1.jpeg";
import post2Img from "../../images/post-2.jpg";
import post3Img from "../../images/post-3.png";

const useStyles = makeStyles({
  followBtn: {
    flex: 1,
    backgroundColor: "#00A3FF",
    color: "#fff",
    fontWeight: 700,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#0087d3",
    },
  },
  followingBtn: {
    flex: 1,
    backgroundColor: "#EEFE3B",
    fontWeight: 700,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#becf00",
    },
  },
});

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [userProfileData, setUserProfileData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUserProfileData(data));
  }, [id]);

  return (
    <Container>
      <h3 className="page_title">{userProfileData.fullname}'s Profile</h3>
      <div className="profile_container">
        <div className="profile_details_top">
          <img
            src={`data:image/png;base64,${userProfileData.profileImg}`}
            alt={userProfileData.fullname}
            className="profilePicture"
          />

          <div>
            <p className="text_details">
              {userProfileData.joiningDate}
              <span className="text-primary"> Joined</span>
            </p>
            <p className="text_details">
              {userProfileData.followers}{" "}
              <span className="text-primary">Followers</span>
            </p>
            <p className="text_details">
              <RiCopperCoinLine />
              {userProfileData.chips} <span className="text-primary">Chips</span>
            </p>
          </div>
        </div>

        <div className="profile_middle_buttons">
          <Button
            variant="contained"
            color="primary"
            className={classes.followBtn}
          >
            Follow
          </Button>
          <IconButton
            size="small"
            href={userProfileData?.social?.fblink}
            target="blank"
          >
            <FaFacebookSquare size="40px" style={{ color: "#00A3FF" }} />
          </IconButton>
          <IconButton
            size="small"
            href={userProfileData?.social?.iglink}
            target="blank"
          >
            <FaInstagramSquare size="40px" style={{ color: "#00A3FF" }} />
          </IconButton>
          <IconButton
            size="small"
            target="blank"
          >
            <MdAddAPhoto size="40px" style={{ color: "#00A3FF" }} />
          </IconButton>
          <IconButton
            size="small"
            target="blank"
            onClick={() => history.push(`/profile/edit/${id}`)}
          >
            <FaUserEdit size="40px" style={{ color: "#ffc107" }} />
          </IconButton>
        </div>

        <ProfilePostCard
          username="Taslim Khaled"
          userImg={taslimImg}
          totalChips="1035503"
          followStatus="follow"
          postImg={postImg}
        />

        <ProfilePostCard
          username="Taslim Khaled"
          userImg={taslimImg}
          totalChips="1035503"
          followStatus="follow"
          postImg={post2Img}
        />

        <ProfilePostCard
          username="Taslim Khaled"
          userImg={taslimImg}
          totalChips="1035503"
          followStatus="follow"
          postImg={post3Img}
        />

        <ProfilePostCard
          username="Taslim Khaled"
          userImg={taslimImg}
          totalChips="1035503"
          followStatus="follow"
          postImg={postImg}
        />
      </div>
    </Container>
  );
};

export default Profile;
