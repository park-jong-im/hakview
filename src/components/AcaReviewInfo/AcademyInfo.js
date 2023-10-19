
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AcademyInfoImg from '../../img/AcademyInfoImg.png'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';


function AcademyInfo({ ac_address, ac_phone, ac_title, ac_body }) {

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

                <Typography variant="h6" component="div" sx={{ fontSize: '25px', marginTop: '80px', fontWeight: 'bold' }}>
                    학원 소개
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginTop: '40px' }}>
                    <Typography variant="h6" component="div" sx={{ fontSize: '20px', color: 'dimgray' }}>
                        <SchoolRoundedIcon sx={{ fontSize: '20px' }} /> 강&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;의
                    </Typography>
                    {ac_title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginTop: '40px' }}>
                    <Typography variant="h6" component="div" sx={{ fontSize: '20px', color: 'dimgray' }}>
                        <FmdGoodIcon sx={{ fontSize: '20px' }} /> 주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소
                    </Typography>
                    {ac_address}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginTop: '40px' }}>
                    <Typography variant="h6" component="div" sx={{ fontSize: '20px', color: 'dimgray' }}>
                        <LocalPhoneIcon sx={{ fontSize: '20px' }} /> 전화번호
                    </Typography>
                    {ac_phone}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '30px', marginTop: '40px' }}>
                    <Typography variant="h6" component="div" sx={{ fontSize: '20px', color: 'dimgray', marginBottom: '150px' }}>
                        <SchoolRoundedIcon />   학원소개
                    </Typography>
                    <div style={{ maxWidth: '80%' }}>
                        {ac_body}
                    </div>
                </div>



            </Box>
        </>
    );
}

export default AcademyInfo;
