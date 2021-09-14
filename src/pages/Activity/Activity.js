import './Activity.css';
import React, { useContext } from 'react';
import {Container} from 'react-bootstrap'
import PostCard from '../../components/PostCard/PostCard';
import { PostContext } from '../../App';

const Activity = () => {
  const [allPosts, setAllPosts] = useContext(PostContext)

  return (
    <Container>
      <h4 className="page_title">Activities</h4>

      <div className="post_container">
        {
          allPosts.map(post => 
            <PostCard
              key={post._id}
              post={post}
              setAllPosts={setAllPosts}
            />
          )
        }
      </div>
    </Container>
  );
};

export default Activity;