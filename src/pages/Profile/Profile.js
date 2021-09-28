import "./Profile.css";
import moment from 'moment';
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Button, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RiCopperCoinLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { PostContext, UserContext } from "../../App";
import ProfilePostCard from "../../components/ProfilePostCard/ProfilePostCard";
import noProfileImg from '../../images/no-profile.png';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
    color: "#fff",
    backgroundColor: "#00a3ff3d",
    fontWeight: 700,
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: '#00a3ff3d'
    }
  },
  typoText: {
    fontSize: "1.5rem",
    letterSpacing: "5px",
    borderBottom: "1px dashed #fff",
    padding: "0.5em 0",
    marginBottom: ".5rem",
    fontWeight: 500,
    lineHeight: 1.2,
  }
});

const Profile = () => {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const [dataLoaded, setDataLoaded] = useState(false)
  const [loggedInUser] = useContext(UserContext)
  const [allPosts] = useContext(PostContext)
  const [profileData, setProfileData] = useState({})
  const [followed, setFollowed] = useState(false)
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setProfileData(data)
        setDataLoaded(true)
        const result = data.followers.find(follower => follower === loggedInUser._id)
        if (result !== undefined) setFollowed(true)
      })
  }, [id])

  useEffect(() => {
    const userPosts = allPosts.reverse().filter(posts => posts.email === profileData.email)
    setUserPosts(userPosts)
  }, [allPosts, profileData.email])

  const followUser = (userId) => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/followUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ following: userId, followBy: loggedInUser._id })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users/${id}`)
          .then(res => res.json())
          .then(data => {
            setProfileData(data)
            const result = data.followers.find(follower => follower === loggedInUser._id)
            if (result !== undefined) setFollowed(true)
          })
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
        fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users/${id}`)
          .then(res => res.json())
          .then(data => {
            setProfileData(data)
            setFollowed(false)
          })
      })
  }

  return (
    <Container>
      <Typography noWrap variant="h3" className={classes.typoText}>{profileData.fullname}'s Profile</Typography>
      <div className="profile_container">
        <div className="profile_details_top">
          {
            !dataLoaded ?
              <div>
                <SkeletonTheme color="#323e59" highlightColor="#31394a">
                  <Skeleton circle={true} height={150} width={150} />
                </SkeletonTheme>
              </div> :
              profileData.profileImg === "" ?
                <img
                  src={noProfileImg}
                  alt={profileData.fullname}
                  className="profilePicture"
                /> :
                <img
                  src={profileData.profileImg}
                  alt={profileData.fullname}
                  className="profilePicture"
                />
          }

          <div>
            {
              !dataLoaded ?
                <SkeletonTheme color="#323e59" highlightColor="#31394a">
                  <div className="d-flex flex-column align-items-end">
                    <Skeleton width={300} className="mb-3" />
                    <Skeleton width={250} className="mb-3" />
                    <Skeleton width={200} />
                  </div>
                </SkeletonTheme> :
                <>
                  <p className="text_details">
                    {moment(profileData.joiningDate).format('DD MMM YYYY')}
                    <span className="text-primary"> Joined</span>
                  </p>

                  <p
                    className="text_details"
                    style={{ cursor: 'pointer' }}
                    onClick={() => history.push(`/followers/${profileData._id}`)}
                  >
                    {profileData.followers?.length}{" "}
                    <span className="text-primary">Followers</span>
                  </p>

                  <p className="text_details">
                    <RiCopperCoinLine /> {" "}
                    {profileData.chips} <span className="text-primary">Chips</span>
                  </p>
                </>
            }
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
                  onClick={() => followUser(profileData._id)}
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
              postImg={userPost.postImg}
              postDate={userPost.uploadDate}
              username={profileData.fullname}
              userImg={profileData.profileImg}
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
