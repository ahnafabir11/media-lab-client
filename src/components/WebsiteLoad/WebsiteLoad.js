import './WebsiteLoad.css';
import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const WebsiteLoad = () => {
  return (
    <Container>
      <div className="image_container">
        <Spinner animation="grow" variant="primary" />
      </div>
    </Container>
  );
};

export default WebsiteLoad;