import * as React from "react";
import { useState, useEffect } from 'react';
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo1 from "../src/img/logo1.png";
import { Link } from "react-router-dom";

import { ac_user_api } from "./Api";

const defaultTheme = createTheme();

function Header() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [name, setName] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('login-token');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    myName()
  }, [accessToken]);

  // useEffect(() => {

  // }, []);

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('login-token');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  }

  // 로그인 버튼 렌더링
  const renderLoginButton = () => {
    if (!accessToken) {
      return <Link to="/login">
        <Button variant="outlined" size="small">
          로그인
        </Button>
      </Link>
    } else {
      return <Button variant="outlined" size="small" onClick={logout}>
        로그아웃
      </Button>
    }
  };

  const myName = async () => {
    if (accessToken) {
      const response = await ac_user_api.me();
      console.log("여기사람있어요" + response)
      setName(response.nickname)

    }
  }

  // 로그인이 안되있을때 마이페이지 클릭
  const handleMyPageClick = () => {
    if (!accessToken) {
      // accessToken이 없으면 alert를 표시하고 로그인 페이지로 이동
      alert("로그인이 필요합니다!!");
    }
  };

  const sections = [
    { title: "학원 정보", url: "/acainfo" },
    { title: "리뷰", url: "/ReviewSearchMain" },
    { title: "자유 게시판", url: "/NoticeBoardMain" },
    { title: "마이페이지", url: "/mypage" },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <img
              src={logo1}
              alt="HakView"
              style={{ width: "100px", height: "auto" }}
            />
          </a>
          <Typography
            component="h1"
            variant="h3"
            color="text.secondary"
            fontSize="30px"
            fontWeight="700"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            {sections.map((section, index) => (
              <React.Fragment key={section.title}>
                {section.title === "마이페이지" && !accessToken ? (
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button
                      color="inherit"
                      fontSize="30px"
                      sx={{
                        marginRight: "50px",
                        textAlign: "center",
                        fontWeight: "700",
                        color: "gray",
                      }}
                      onClick={handleMyPageClick}
                    >
                      {section.title}
                    </Button>
                  </Link>
                ) : (
                  <Link to={section.url} style={{ textDecoration: "none" }}>
                    <Button
                      color="inherit"
                      href={section.url}
                      fontSize="30px"
                      sx={{
                        marginRight: "50px",
                        textAlign: "center",
                        fontWeight: "700",
                        color: "gray",
                      }}
                    >
                      {section.title}
                    </Button>
                  </Link>
                )}
                {index < sections.length - 1 && ( // 마지막 버튼이 아닐 때만 간격을 추가
                  <span style={{ marginRight: "50px" }}></span>
                )}
              </React.Fragment>
            ))}
          </Typography>
          {accessToken && <div style={{ fontSize: '12px' }}>{name}님 환영합니다.&nbsp;&nbsp;</div>}
          {/* <IconButton>
            <SearchIcon />
          </IconButton> */}
          {renderLoginButton()}
        </Toolbar>
      </Container>
    </ThemeProvider>
  );
}

export default Header;
