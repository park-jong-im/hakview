import React from 'react';
import Typography from '@mui/material/Typography';
import Rating from './Rating'; 


function RatingItem({ title, rating }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '50%', textAlign: 'right', marginRight: '10px' }}>
        <Typography variant="h6" component="div" sx={{ fontSize: '15px', fontWeight: 'bold' }}>
          {title}
        </Typography>
      </div>
      <Rating value={rating} /> {/* Rating 컴포넌트를 사용하여 평점을 표시합니다. */}
      <Typography variant="h6" component="div" sx={{ fontSize: '15px', fontWeight: 'bold', marginLeft: '10px' }}>
  {rating ? rating.toFixed(1) : ' '} {/*별 소수점 첫째자리*/}
</Typography>
    </div>
  );
}

export default RatingItem;
