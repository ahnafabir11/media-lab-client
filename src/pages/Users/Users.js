import './Users.css';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import UserCard from './../../components/UserCard/UserCard';
import { UserContext } from '../../App';

const Users = () => {
  const [allUsers, setAllUsers] = useState([])
  const [loggedInUser] = useContext(UserContext)

  useEffect(() => {
    fetch(`http://localhost:5000/api/users`)
      .then(res => res.json())
      .then(data => {
        const users = data.filter(user => user.email !== loggedInUser.email)
        setAllUsers(users)
      })
  }, [])

  return (
    <Container>
      <h4 className="page_title">Users</h4>

      <div className="users_container">
        {
          allUsers.map(user =>
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