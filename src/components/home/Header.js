import * as React from "react";
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

const defaultTheme = createTheme();

function Header() {
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
                {index < sections.length - 1 && ( // 마지막 버튼이 아닐 때만 간격을 추가
                  <span style={{ marginRight: "50px" }}></span>
                )}
              </React.Fragment>
            ))}
          </Typography>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Link to="/login">
            <Button variant="outlined" size="small">
              로그인
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </ThemeProvider>
  );
}

export default Header;
