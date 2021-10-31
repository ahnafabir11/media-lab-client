import './Users.css';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import UserCard from './../../components/UserCard/UserCard';
import { UserContext, AllUserContext } from '../../App';
import { getAnalytics, logEvent } from "firebase/analytics";

const Users = () => {
  const [loggedInUser] = useContext(UserContext)
  const [allUsers, setAllUsers] = useContext(AllUserContext)
  const [allUsersData, setAllUsersData] = useState(allUsers)

  useEffect(() => {
    const users = allUsers.filter(user => user.email !== loggedInUser.email)
    setAllUsersData(users)
  }, [allUsers])
  
  const analytics = getAnalytics();
  logEvent(analytics, 'users page');

  return (
    <Container>
      <h4 className="page_title">Users</h4>

      <div className="users_container">
        {
          allUsersData.map(user =>
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

export default Users;