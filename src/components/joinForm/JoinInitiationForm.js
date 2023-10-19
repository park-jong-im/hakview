


import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo1 from "../../img/logo1.png";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";


export default function JoinInitiationForm() {
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        학뷰 Website {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  const cards = [
    {
      title: "학생/일반",
      description:
        "리뷰작성과 함께 모든 리뷰와 학원정보를 확인하실 수 있습니다.",
      icon: <PiStudentFill size={130} />,
    },
    {
      title: "학원/기업",
      description:
        "세상 가장 쉬운 방법으로 우리 학생들과 소통할 수도, 학원의 정보를 등록할 수도 있습니다.",
      icon: <GiTeacher size={130} />,
    },
  ];

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ py: 10 }} maxWidth="md">
        <Typography component="h1" variant="h" align="center">
          <img
            src={logo1}
            alt="HakView"
            style={{ marginTop: "20px", width: "130px", height: "auto" }}
          />
        </Typography>
        <Typography
          variant="h5"
          align="center"
          style={{
            marginTop: "30px",
            color: "lightslategray",
            fontSize: "20px",
          }}
        >
          본인이 해당하시는 가입 유형을 아래에서 선택해주세요.
        </Typography>
        <Box sx={{ mt: 10 }}>
          <Grid container spacing={4} justifyContent="center">
            {cards.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Link
                  to={card.title === "학생/일반" ? "/user" : "/academy"}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease", // hover 시 transition 추가

                      "&:hover": {
                        // hover 시 스타일 추가
                        cursor: "pointer",
                        transform: "scale(1.04)",
                        zIndex: 3,
                        boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "18%",
                        pb: "10%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        backgroundColor:
                          card.title === "학생/일반" ? "#0487D1" : "#9370DB", // 각 아이콘에 대한 배경색 설정
                      }}
                    >
                      {card.icon}
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1, marginTop: "10px" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        style={{ textAlign: "center" }}
                        sx={{ fontWeight: "bold" }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "lightslategray",
                          fontSize: "15px",
                          marginTop: "20px",
                        }}
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 2 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        ></Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
