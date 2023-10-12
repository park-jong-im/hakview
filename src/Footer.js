import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo2 from "../src/img/logo2.png"

function Copyright() {
  return (
    <Typography
      color="text.secondary"
      fontWeight="bold"
      align="left"
      style={{ marginLeft: 0 }}
    >
      {" © "}
      학뷰 Website {new Date().getFullYear()}.
    </Typography>
  );
}

function Footer() {
  return (
    <Container
      maxWidth="lg"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      
      <Typography variant="body1" color="text.secondary">
        <Typography>
      <img
              src={logo2}
              alt="HakView"
              style={{ width: "120px", height: "auto" }}
            />
            </Typography>
        서울특별시 금천구 가산디지털2로 101 | 대표이사: 장세민 | 사업자등록번호: 123-45-67890|
        <br />
        통신판매업신고번호: 2023-서울가산-01011 | 대표메일: antking@hakview.co.kr
        <br />
        <Copyright />
      </Typography>
      <Typography color="text.secondary" style={{ marginBottom: "8px" }}>
          <br/><br/>광고제휴문의 | 학뷰 학원소개 | 
          <span style={{ fontWeight: "bold" }}> 개인정보처리방침</span> | 이용약관
        </Typography>
      </Container>
  );
}

export default Footer;