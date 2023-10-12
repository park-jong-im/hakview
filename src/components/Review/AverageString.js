import * as React from 'react';
import RatingItem from './RatingItem'; // RatingItem 컴포넌트를 가져옵니다.

function AverageString({ teachRatingAvg, curriclmRatingAvg, serviceRatingAvg, convRatingAvg, costRatingAvg, avgRatingAvg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RatingItem title="강의력" rating={teachRatingAvg} />
      <RatingItem title="커리큘럼" rating={curriclmRatingAvg} />
      <RatingItem title="서비스" rating={serviceRatingAvg} />
      <RatingItem title="편의성" rating={convRatingAvg} />
      <RatingItem title="가성비" rating={costRatingAvg} />   
      
    </div>
  );
}

export default AverageString;
