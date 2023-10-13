import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo1 from "../../img/logo1.png";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

const messageStyle = {
  color: "red",
  fontSize: "14px",
};

// 유효성
const FindResultPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const handleFind = async () => {
    try {
      // 엑시오스로 서버에 인증요청 보내기
      if (isPassword && isPasswordConfirm) {
        const response = await axios
          .post("http://localhost:8080/auth/findout", {
            password: password,
            passwordConfirm: passwordConfirm,
          })
          .then((response) => {
            alert(
              "서버에 보내고 서버가 다시 보낸 데이터\n" +
                JSON.stringify(response.data)
            );
          })
          .catch(() => {
            console.log("aaa");
          });

        // 서버 응답 처리
        if (response.status === 201) {
          alert("새로운 비밀번호로 변경되었습니다.");
        } else {
          alert("새로운 비밀번호 변경실패: 서버 오류");
        }
      }
    } catch (error) {
      console.error("변경 오류:", error);
    }
  };

  // 구현 값 저장
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  const requiredPassword = () => {
    if (password.length < 1) {
      setPasswordMessage("비밀번호를 입력해주세요.");
      setIsPassword(false);
    }
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호를 다시 확인해주세요.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 동일합니다.");
      setIsPasswordConfirm(true);
    }
  };

  const requiredPasswordConfirm = () => {
    if (passwordConfirm.length < 1) {
      setPasswordConfirmMessage("비밀번호를 입력해주세요.");
      setIsPasswordConfirm(false);
    }
  };

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
            <Typography component="h1" variant="h5" sx={{ marginTop: "40px" }}>
              새비밀번호 설정
            </Typography>
            <Typography
              component="h1"
              variant="body1"
              sx={{
                mb: "50px",
                mt: "20px",
                fontSize: "16px",
                color: "text.secondary",
              }}
            >
              <ErrorOutlineRoundedIcon
                style={{ color: "gray", marginLeft: "-250px" }}
              />
              새로운 비밀번호를 설정해주세요
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="비밀번호"
                  type="password"
                  fullWidth
                  autoComplete="password"
                  variant="standard"
                  value={password}
                  onChange={onChangePassword}
                  onBlur={requiredPassword}
                />
                <p className="message" style={messageStyle}>
                  {passwordMessage}
                </p>
              </Grid>
              <Grid item xs={10} sm={6}>
                <TextField
                  required
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label="비밀번호 확인"
                  type="password"
                  fullWidth
                  autoComplete="passwordConfirm"
                  variant="standard"
                  value={passwordConfirm}
                  onChange={onChangePasswordConfirm}
                  onBlur={requiredPasswordConfirm}
                />
                <p className="message" style={messageStyle}>
                  {passwordConfirmMessage}
                </p>
              </Grid>
            </Grid>
          </Box>
          <Link to="/login" style={linkStyle}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleFind}
              sx={{
                mt: 3,
                ml: 46,
                backgroundImage:
                  "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
                color: "white",
              }}
              top={null}
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

export default FindResultPassword;
