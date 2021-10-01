import './SkeletonCard.css';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonCard = () => {
  return (
    <div className="skeleton_card">
      <SkeletonTheme color="#1E273C" highlightColor="#31394a">
        <div className="d-flex align-items-center px-3 py-2">
          <Skeleton circle={true} height={50} width={50} />
          <div className="d-flex flex-column ml-2">
            <Skeleton width={200} />
            <Skeleton width={150} />
          </div>
        </div>
        <div className="px-2">
          <Skeleton height={350} />
        </div>
        <div className="d-flex align-items-center justify-content-between px-3 py-2">
          <Skeleton width={180} />
          <div className="d-flex align-items-center">
            <Skeleton circle={true} height={30} width={30} />
            <p className="ml-2 mb-0">
              <Skeleton circle={true} height={30} width={30} />
            </p>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonCard;