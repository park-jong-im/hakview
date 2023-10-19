import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import Footer from '../../Footer';
import Header from '../../Header';
import { freeboard_api } from "../../Api";



const containerStyle = {
  display: 'flex',
  alignItems: 'center', // 수직 가운데 정렬
};

const iconStyle = {
  marginLeft: 'auto', // 아이콘과 버튼 사이의 간격을 조절  
};


export default function NoticeBoardForm() {
  const [freeboardData, setFreeboardData] = useState([]); // 데이터 상태 추가
  const { postId } = useParams();
  const navigate = useNavigate(); // useHistory 대신 useNavigate를 사용합니다.

  const [isLiked, setIsLiked] = useState(false); //좋아요버튼 토글

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const iconColor = isLiked ? '#0288d1' : '#808080'; //좋아요 버튼 컬러


  const handleGoToList = () => {
    navigate('/NoticeBoardMain'); // 목록으로 가기 버튼
  };

  useEffect(() => {
    // 페이지가 로드될 때 serial 값을 사용하여 데이터를 불러옴
    const fetchData = async () => {
      try {
        console.log(postId);
        const response = await freeboard_api.one(postId);
        setFreeboardData(response);
        console.log(response)
      } catch (error) {
        console.error('에러:', error);
      }
    };

    fetchData();
  }, [postId]);


  return (
    <>
      <Header />
      <div style={{ border: '1px solid #ccc', width: '1000px', borderRadius: '10px', margin: '80px auto' }}>
        <div style={{ border: '1px solid white', width: '900px', margin: '40px auto' }}>
          <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
            자유 게시판
          </Typography>
          <hr style={{ width: '900px', border: '0', marginBottom: '20px', borderBottom: '1px solid #ccc' }} />
          <Typography variant="h6" style={{ marginBottom: '20px', color: '#3f51b5', fontWeight: 'bold' }}>
            {freeboardData.freeboardTitle}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="/broken-image.jpg"
              style={{ width: '30px', height: '30px', marginRight: '10px' }}
            />
            <Typography variant="body1" style={{ color: '#666', flexBasis: '50%', flexGrow: 1 }}>
              {freeboardData.ac_userNickname}
            </Typography>
            <Typography variant="body1" style={{ color: '#666' }}>
              조회 |
            </Typography>
            <Typography variant="body1" style={{ color: '#666', flexBasis: '1%', flexGrow: 0.5 }}>
              16015
            </Typography>
            <Typography variant="body1" style={{ color: '#666' }}>
              추천 |
            </Typography>
            <Typography variant="body1" style={{ color: '#666', flexBasis: '1%', flexGrow: 0.2 }}>
              45
            </Typography>
            <Typography variant="body1" style={{ color: '#666', flexBasis: '1%', flexGrow: 0.5 }}>
              날짜 |
            </Typography>
            <Typography variant="body1" style={{ color: '#666', marginLeft: 'auto' }}>
              {freeboardData.createdAt}
            </Typography>
          </div>

          <hr style={{ width: '900px', border: '0', marginTop: '20px', marginBottom: '20px', borderBottom: '1px solid #ccc' }} />
          <Typography variant="body1" style={{ marginBottom: '30px', color: '#666' }}>
            {freeboardData.freeboardBody}
          </Typography>
          <hr style={{ width: '900px', border: '0', marginTop: '20px', marginBottom: '20px', borderBottom: '1px solid #ccc' }} />
          <div style={containerStyle}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="button"
              onClick={handleGoToList}
              sx={{
                backgroundImage: 'linear-gradient(45deg, #9370DB 30%, #0288d1 90%)',
                color: 'white',
                fontSize: '15px',
                width: 'auto',
              }}

            >
              &laquo; 목록으로 가기
            </Button>
            <ThumbUpAltSharpIcon
              style={{ ...iconStyle, color: iconColor }}
              onClick={toggleLike}
            />
            &nbsp;0
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}