import React, { useState } from "react";
import { auth_api } from "../../Api";
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

  const onClickLogin = async () => {
    console.log("click login");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);
    try {
      await auth_api.login(
        inputId,
        inputPw
      )
    } catch {
      alert("존재하지 않은 계정입니다.");
    }
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
            <Link>Forgot password?</Link>
          </Grid>
          <Grid item>
            <RouterLink to="/join" style={linkStyle}>
              Sign Up
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
