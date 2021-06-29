import './Activity.css';
import React from 'react';
import {Container} from 'react-bootstrap'
import PostCard from '../../components/PostCard/PostCard';
import taslimImg from '../../images/taslim.png';
import postImg from '../../images/post-1.jpeg';
import post2Img from '../../images/post-2.jpg';
import post3Img from '../../images/post-3.png';

const Activity = () => {
  return (
    <Container>
      <h4 className="page_title">Activities</h4>

      <div className="post_container">
        <PostCard 
          username="Taslim Khaled"
          userImg={taslimImg}
          totalChips="1035503"
          followStatus="follow"
          postImg={postImg}
        />
        
        <PostCard 
          username="Taslim Khaled"
          userImg={taslimImg}
          totalChips="1035503"
          followStatus="follow"
          postImg={post2Img}
        />
        
        <PostCard 
          username="Taslim Khaled"
          userImg={taslimImg}
          totalChips="1035503"
          followStatus="follow"
          postImg={post2Img}
        />

        <PostCard
          username="Taslim Khaled"
          userImg={taslimImg}
          totalChips="1035503"
          followStatus="follow"
          postImg={post3Img}
        />
      </div>
    </Container>
  );
};

export default Activity;