import './Activity.css';
import React, { useEffect, useState } from 'react';
import {Container} from 'react-bootstrap'
import PostCard from '../../components/PostCard/PostCard';

const Activity = () => {
  const [allPosts, setallPosts] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/api/allPosts`)
      .then(res => res.json())
      .then(data => setallPosts(data.reverse()))
  }, [])

  return (
    <Container>
      <h4 className="page_title">Activities</h4>

      <div className="post_container">
        {
          allPosts.map(post => 
            <PostCard
              key={post._id}
              post={post}
              useremail={post.email}
              setallPosts={setallPosts}
            />
          )
        }
      </div>
    </Container>
  );
};

export default Activity;