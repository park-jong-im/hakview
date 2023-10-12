import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import logo1 from "../../img/logo1.png";
import { Link as RouterLink } from "react-router-dom";

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = () => {
    console.log("click login");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);
    axios
      .post(
        "https://116adddd-b5f0-4ac7-8449-957a6da3f657.mock.pstmn.io/login",
        null,
        {
          params: {
            user_id: inputId,
            user_pw: inputPw,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("res.data.userId :: ", res.data.userId);
        console.log("res.data.msg :: ", res.data.msg);
        if (res.data.userId === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log("======================", res.data.msg);
          alert("입력하신 id 가 일치하지 않습니다.");
        } else if (res.data.userId === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log(
            "======================",
            "입력하신 비밀번호 가 일치하지 않습니다."
          );
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data.userId === inputId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_id", inputId);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
      })
      .catch();
  };

  // useEffect(() => {
  //   axios
  //     .get("https://116adddd-b5f0-4ac7-8449-957a6da3f657.mock.pstmn.io/login")
  //     .then((res) => console.log(res))
  //     .catch();
  // }, []);

  const linkStyle = {
    textDecoration: "none",
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
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
        <Typography component="h1" variant="h5" sx={{ marginTop: "40px" }}>
          로그인
        </Typography>
        <TextField
          margin="normal"
          id="input_id"
          required
          fullWidth
          label="ID"
          variant="outlined"
          value={inputId}
          onChange={handleInputId}
        />
        <TextField
          margin="normal"
          id="input_pw"
          required
          fullWidth
          label="PW"
          type="password"
          variant="outlined"
          value={inputPw}
          onChange={handleInputPw}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onClickLogin}
          sx={{
            mt: 3,
            mb: 2,
            backgroundImage: "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
            color: "white",
          }}
        >
          Login
        </Button>

        <Grid container>
          <Grid item xs>
            <Link>비밀번호 찾기</Link>
          </Grid>
          <Grid item>
            <RouterLink to="/join" style={linkStyle}>
              <Link to="/join">회원가입</Link>
            </RouterLink>
          </Grid>
        </Grid>
        <Box mt={10}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            학뷰 Website {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
