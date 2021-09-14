import './Followers.css';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { AllUserContext } from '../../App';
import UserCard from '../../components/UserCard/UserCard';

const Followers = () => {
  const { id } = useParams()
  const [allUsers, setAllUsers] = useContext(AllUserContext)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    fetch(`https://mysterious-sierra-15948.herokuapp.com/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        const profileFollowers = data.followers;
        const followersList = allUsers.filter(user => profileFollowers.includes(user._id))
        setFollowers(followersList)
      })
  }, [id, allUsers])

  return (
    <Container>
      <h3 className="page_title">Followers</h3>

      <div className="users_container">
        {
          followers.map(user =>
            <UserCard
              key={user._id}
              user={user}
              setAllUsers={setAllUsers}
            />
          )
        }
      </div>
    </Container>
  );
};

export default Followers;