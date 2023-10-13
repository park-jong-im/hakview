import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Styled
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import logo1 from "../../img/logo1.png";

// Message 스타일 설정
const messageStyle = {
  color: "red",
  fontSize: "14px",
};

// event 변수선언
const FindId = () => {
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  // 오류메세지 상태 저장
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");

  // 유효성 검사
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

  // event 받아서 값 저장
  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);
    if (currentBirth.length > 0) {
      setBirthMessage("");
      setIsBirth(true);
    }
  };

  const requiredBirth = () => {
    if (birth.length < 1) {
      setBirthMessage("생년월일을 입력해주세요.");
      setIsBirth(false);
    }
  };

  const onChangePhone = (getNumber) => {
    const currentPhone = getNumber;
    setPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다!");
      setIsPhone(false);
    } else {
      setPhoneMessage("사용 가능한 번호입니다.");
      setIsPhone(true);
    }
  };

  const addHyphen = (e) => {
    const currentNumber = e.target.value.replace(/[^0-9]/g, "");
    if (currentNumber.length >= 3) {
      let plusNum = "";
      for (let i = 0; i < currentNumber.length; i++) {
        if (i === 3 || i === 7) {
          plusNum += "-";
        }
        plusNum += currentNumber[i];
      }
      setPhone(plusNum);
      onChangePhone(plusNum);
    } else {
      setPhone(currentNumber);
      onChangePhone(currentNumber);
    }
  };

  const requiredPhone = () => {
    if (phone.length < 1) {
      setPhoneMessage("전화번호를 입력해주세요.");
      setIsPhone(false);
    }
  };

  // 버튼 클릭 시 실행되는 함수
  const handleFind = async () => {
    try {
      // 엑시오스로 서버에 인증요청 보내기
      if (
        isPhone &&
        isBirth
      ) {
        const response = await axios
          .post("http://localhost:8080/auth/findout", {
            phone: phone,
            birth: birth,
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
          alert("인증이 완료되었습니다.");
        } else {
          alert("인증 실패: 서버 오류");
        }
      }
    } catch (error) {
      console.error("인증 오류:", error);
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
             <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: "40px" }}
            >
             아이디 찾기
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              sx={{ marginTop: "40px", mb: "50px", mt:"10px", fontSize: "16px",color:"text.secondary" }}
            >
             등록한 회원정보로 인증
            </Typography>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="birth"
                name="birth"
                type="date"
                label={birth ? "생년월일" : "생년월일"}
                fullWidth
                autoComplete="passwordConfirm"
                variant="standard"
                value={birth}
                onChange={onChangeBirth}
                onBlur={requiredBirth}
                InputProps={{
                  style: {
                    color: birth ? "black" : "transparent"
                  }
                }}
              />
              <p className="message" style={messageStyle}>
                {birthMessage}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phone"
                name="phone"
                label="전화번호"
                fullWidth
                autoComplete="phone"
                variant="standard"
                value={phone}
                onChange={addHyphen}
                onBlur={requiredPhone}
              />
              <p className="message" style={messageStyle}>
                {phoneMessage}
              </p>
            </Grid>
            <Link to="/findResultId" style={linkStyle}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleFind}
                sx={{
                  mt: 3,
                  ml: 1,
                  backgroundImage:
                    "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
                  color: "white",
                }}
                top={null}
              >
               다음
              </Button>
            </Link>
          </Grid>
        </Paper>
      </Container>
      <Copyright />  
    </React.Fragment>
  );
};

export default FindId;
