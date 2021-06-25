import './Activity.css';
import React from 'react';
import {Container} from 'react-bootstrap'
import PostCard from '../../components/PostCard/PostCard';

const Activity = () => {
  return (
    <Container>
      <h4 className="page_title">Activity</h4>

      <div>
        <PostCard 
          
        />
      </div>
    </Container>
  );
};

export default Activity;