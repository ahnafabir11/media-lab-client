import "./Profile.css";
import moment from 'moment';
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RiCopperCoinLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { UserContext } from "../../App";
import ProfilePostCard from "../../components/ProfilePostCard/ProfilePostCard";
import noProfileImg from '../../images/no-profile.png';

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
    backgroundColor: "#cad63e",
    fontWeight: 700,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#becf00",
    },
  },
});

const Profile = () => {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const [loggedInUser] = useContext(UserContext)
  const [profileData, setProfileData] = useState({})
  const [followed, setFollowed] = useState(false)
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setProfileData(data)
        const result = data.followers.find(follower => follower === loggedInUser._id)
        if(result !== undefined) setFollowed(true)
      })
  }, [id])

  useEffect(() => {
    fetch(`http://localhost:5000/api/allPosts`)
      .then(res => res.json())
      .then(data => {
        const userPosts = data.reverse().filter(posts => posts.email === profileData.email)
        setUserPosts(userPosts)
      })
  }, [profileData])

  const followUser = (userId) => {
    fetch(`http://localhost:5000/api/followUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ following: userId, followBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/api/users/${id}`)
          .then(res => res.json())
          .then(data => {
            setProfileData(data)
            const result = data.followers.find(follower => follower === loggedInUser._id)
            if (result !== undefined) setFollowed(true)
          })
      })
  }

  const unFollowUser = (userId)=> {
    fetch(`http://localhost:5000/api/unFollowUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ unFollowing: userId, unFollowBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/api/users/${id}`)
          .then(res => res.json())
          .then(data => {
            setProfileData(data)
            setFollowed(false)
          })
      })
  }

  return (
    <Container>
      <h3 className="page_title">{profileData.fullname}'s Profile</h3>
      <div className="profile_container">
        <div className="profile_details_top">
          {
            profileData.profileImg?.img === undefined ?
              <img
                src={noProfileImg}
                alt={profileData.fullname}
                className="profilePicture"
              /> :
              <img
                src={`data:image/png;base64,${profileData.profileImg?.img}`}
                alt={profileData.fullname}
                className="profilePicture"
              />
          }

          <div>
            <p className="text_details">
              {moment(profileData.joiningDate).format('DD MMM YYYY')}
              <span className="text-primary"> Joined</span>
            </p>
            <p className="text_details">
              {profileData.followers?.length}{" "}
              <span className="text-primary">Followers</span>
            </p>
            <p className="text_details">
              <RiCopperCoinLine /> {" "}
              {profileData.chips} <span className="text-primary">Chips</span>
            </p>
          </div>
        </div>

        <div className="profile_middle_buttons">
          {
            loggedInUser.email !== profileData.email ?
              followed === true ?
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.followingBtn}
                  onClick={() => unFollowUser(profileData._id)}
                >
                  Following
                </Button> :
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.followBtn}
                  onClick={()=> followUser(profileData._id)}
                >
                  Follow
                </Button>
              :
              <></>
          }
          <div className="ml-auto">
            <IconButton
              size="small"
              href={profileData?.social?.fbLink}
              target="blank"
            >
              <FaFacebookSquare size="40px" style={{ color: "#00A3FF" }} />
            </IconButton>
            <IconButton
              size="small"
              href={profileData?.social?.igLink}
              target="blank"
            >
              <FaInstagramSquare size="40px" style={{ color: "#00A3FF" }} />
            </IconButton>

            {
              loggedInUser.email === profileData.email &&
              <>
                <IconButton
                size="small"
                target="blank"
                onClick={() => history.push('/post/create')}
                            >
                <MdAddAPhoto size="40px" style={{ color: "#00A3FF" }} />
                            </IconButton>
                <IconButton
                  size="small"
                  target="blank"
                  onClick={() => history.push(`/profile/edit`)}
                >
                  <FaUserEdit size="40px" style={{ color: "#ffc107" }} />
                </IconButton>
              </>
            }
          </div>
        </div>

        {
          userPosts.map(userPost =>
            <ProfilePostCard
              key={userPost._id}
              userPost={userPost}
              postImg={userPost.postImg.img}
              postDate={userPost.uploadDate}
              username={profileData.fullname}
              userImg={profileData.profileImg?.img}
              userEmail={profileData.email}
              setUserPosts={setUserPosts}
            />
          )
        }
      </div>
    </Container>
  );
};

export default Profile;
