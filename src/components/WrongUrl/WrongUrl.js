import './WrongUrl.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from '@material-ui/core';

const WrongUrl = () => {
  return (
    <Container>
      <div className="text_container">
        <h3 className="text-white text-center">404 Page Not Found</h3>
        <Button variant="contained" color="primary" className="mx-auto d-block">Go Home Page</Button>
      </div>
    </Container>
  );
};

export default WrongUrl;