import './Users.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import UserCard from './../../components/UserCard/UserCard';

const Users = () => {
  return (
    <Container>
      <h4 className="page_title">Users</h4>

      <div className="users_container">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </Container>
  );
};

export default Users;