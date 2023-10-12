
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AcademyInfoImg from '../../img/AcademyInfoImg.png'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';


function AcademyInfo() {    
  
    return (
        <>
        <div>
        <img src={AcademyInfoImg} alt="Academy Info" style={{ width: '1000px' }} />
        </div>
        <Box
            sx={{
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto',
                padding: '0 16px',
                border: '0px solid rgba(0 ,0 ,0 , 0.1)',
                '@media (max-width: 768px)': {
                padding: '0',
                },
            }}
            > 
         
        <Typography variant="h6" component="div" sx={{ fontSize: '25px', marginTop: '80px', fontWeight: 'bold'}}>
            학원 소개
            </Typography>     
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginTop: '40px' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '20px', color: 'dimgray'}}>
            <FmdGoodIcon sx={{ fontSize: '20px'}}/> 주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소
            </Typography>
            서울 은평구 연서로 156
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginTop: '40px' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '20px', color: 'dimgray' }}>
            <LocalPhoneIcon sx={{ fontSize: '20px'}}/> 전화번호
            </Typography>
            010-8252-6256
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '30px', marginTop: '40px' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '20px', color: 'dimgray', marginBottom: '150px' }}>
             <SchoolRoundedIcon/>   학원소개
            </Typography>
        <div style={{maxWidth:'80%'}}>
            선생님과 학생이 진정으로 소통하는 교실, 스스로 공부하는 학습 환경을 타임교육이 만들어 가겠습니다. 세계에 내 놓아도 부끄럽지 않은 교육, 세계 교육을 선도하는 기업을 타임교육이 실현하겠습니다.
        </div>
      </div>


       
        </Box>
        </>
          );
        }
        
        export default AcademyInfo;
