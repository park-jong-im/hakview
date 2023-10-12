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

// JoinForm 컴포넌트 내에서 Message 스타일 설정
const messageStyle = {
  color: "red",
  fontSize: "14px",
};

// 회원가입 구현 event 변수선언
const UserModification = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  // 오류메세지 상태 저장
  const [idMessage, setIdMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);

  // 회원가입 구현 event 받아서 값 저장
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("사용가능한 아이디 입니다.");
      setIsId(true);
    }
  };

  const requiredId = () => {
    if (id.length < 1) {
      setIdMessage("아이디를 입력해주세요.");
      setIsId(false);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

  const requiredName = () => {
    if (name.length < 1) {
      setNameMessage("닉네임을 입력해주세요.");
      setIsName(false);
    }
  };

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

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleModify = async () => {
    try {
      // 엑시오스로 서버에 회원가입 요청 보내기
      if (
        isName &&
        isId &&
        isPassword &&
        isPasswordConfirm &&
        isPhone &&
        isBirth
      ) {
        const response = await axios
          .post("http://localhost:8080/auth/modify", {
            id: id,
            name: name,
            password: password,
            passwordConfirm: passwordConfirm,
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
          alert("회원정보가 변경되었습니다.");
        } else {
          alert("회원정보 변경 실패: 서버 오류");
        }
      }
    } catch (error) {
      console.error("회원정보 변경 오류:", error);
    }
  };

  const linkStyle = {
    textDecoration: "none",
  };

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
              학생 / 일반
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
                id="id"
                name="id"
                label="아이디"
                fullWidth
                autoComplete="id"
                variant="standard"
                value="개미킹"
                onChange={onChangeId}
                onBlur={requiredId}
              />
              <p className="message" style={messageStyle}>
                {idMessage}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="닉네임"
                fullWidth
                autoComplete="name"
                variant="standard"
                value="개미킹"
                onChange={onChangeName}
                onBlur={requiredName}
              />
              <p className="message" style={messageStyle}>
                {nameMessage}
              </p>
            </Grid>
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
                value="개미킹"
                onChange={onChangePassword}
                onBlur={requiredPassword}
              />
              <p className="message" style={messageStyle}>
                {passwordMessage}
              </p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="passwordConfirm"
                name="passwordConfirm"
                label="비밀번호 확인"
                type="password"
                fullWidth
                autoComplete="passwordConfirm"
                variant="standard"
                value="개미킹"
                onChange={onChangePasswordConfirm}
                onBlur={requiredPasswordConfirm}
              />
              <p className="message" style={messageStyle}>
                {passwordConfirmMessage}
              </p>
            </Grid>
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
                    color: birth ? "black" : "transparent",
                  },
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

            <Button
              variant="contained"
              type="submit"
              onClick={handleModify}
              sx={{
                mt: 3,
                ml: 1,
                backgroundImage:
                  "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
                color: "white",
              }}
              top={null}
            >
              저장하기
            </Button>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default UserModification;
