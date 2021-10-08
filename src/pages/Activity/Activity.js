import './Activity.css';
import React, { useContext } from 'react';
import { PostContext } from '../../App';
import Masonry from 'react-masonry-css';
import { Container } from 'react-bootstrap';
import PostCard from '../../components/PostCard/PostCard';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';

const Activity = ({ dataLoaded }) => {
  const [allPosts, setAllPosts] = useContext(PostContext)

  const breakpoints = {
    default: 3,
    1010: 2,
    575: 1
  }

  return (
    <Container>
      <h4 className="page_title">Activities</h4>

      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {
          allPosts.map(post =>
            <PostCard
              key={post._id}
              post={post}
              setAllPosts={setAllPosts}
            />
          )
        }
      </Masonry>

      {
        !dataLoaded &&
        <div className="post_container">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      }
    </Container>
  );
};

export default Activity;