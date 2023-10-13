import { Link } from "react-router-dom";
import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo1 from "../../img/logo1.png";

const linkStyle = {
  textDecoration: "none",
};

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

const FindResultId = () => {
  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={logo1}
              alt="HakView"
              style={{ width: "100px", height: "auto" }}
            />
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: "40px", mb: "30px" }}
            >
              본인인증이 확인되었습니다!
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              sx={{
                marginTop: "40px",
                mb: "50px",
                mt: "10px",
                fontSize: "16px",
              }}
            >
              회원님의 아이디는 ***** 입니다.
            </Typography>
          </Box>
          <Link to="/login" style={linkStyle}>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                ml: 22,
                backgroundImage:
                  "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
                color: "white",
              }}
            >
              로그인하러가기
            </Button>
          </Link>
        </Paper>
      </Container>
      <Copyright />
    </React.Fragment>
  );
};

export default FindResultId;
