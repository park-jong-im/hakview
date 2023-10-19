import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import DeleteAccount from "./DeleteAccount";
import Box from "@mui/material/Box";
import { ac_user_api } from "../../Api";

export default function Chart() {

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [ac_name, setAc_name] = useState("");
  const [ac_phone, setAc_phone] = useState("");
  const [ac_address, setAc_address] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에서 유저 정보를 가져오기
        const response = await ac_user_api.me();
        setId(response.id);
        setNickname(response.nickname);
        setBirth(response.birth);
        setPhone(response.phone);
        setAc_name(response.ac_name);
        setAc_phone(response.ac_phone);
        setAc_address(response.ac_address);
      } catch (error) {
        console.error('유저 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchData();
  }, []);

  // 기본정보
  const account = [
    { text: "아이디 : ", key: id },
    { text: "닉네임 : ", key: nickname },
    { text: "생년월일 : ", key: birth },
    { text: "전화번호 : ", key: phone }
  ];

  // 계정이 학원장일때 보이는거
  const ac_account = [
    { text: "학원 이름 : ", key: ac_name },
    { text: "학원 전화번호 : ", key: ac_phone },
    { text: "학원 주소 : ", key: ac_address }
  ]

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 750,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            프로필
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Avatar
            sx={{
              margin: "auto",
              mb: 2,
              bgcolor: "darkgray",
              width: 150,
              height: 150,
            }}
          >
            <BusinessRoundedIcon sx={{ fontSize: 120 }} />
          </Avatar>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 1, ml: 45, color: "darkgray", fontWeight: "bold" }}
          >
            *기본정보
          </Typography>
        </Grid>
      </Grid>
      <List disablePadding>

        {account.map((id) => (
          <ListItem
            key={id.text}
            sx={{ py: 2, px: 0, display: "flex", alignItems: "flex-start" }}
          >
            <Grid container justifyContent="space-between">
              <Grid item xs={6}>
                {/* ListItemText 대신 Typography 사용 */}
                <Typography variant="body1" align="right" sx={{ mr: 0 }}>
                  {id.text}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="left" sx={{ ml: 2 }}>
                  {id.key}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}

        {ac_name &&
          ac_account.map((id) => (
            <ListItem
              key={id.text}
              sx={{ py: 2, px: 0, display: "flex", alignItems: "flex-start" }}
            >
              <Grid container justifyContent="space-between">
                <Grid item xs={6}>
                  {/* ListItemText 대신 Typography 사용 */}
                  <Typography variant="body1" align="right" sx={{ mr: 0 }}>
                    {id.text}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="left" sx={{ ml: 2 }}>
                    {id.key}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}

      </List>
      <Box sx={{ mt: "auto", alignSelf: "flex-end" }}>
        <DeleteAccount /> {/* 회원 탈퇴 */}
      </Box>
    </Paper>
  );
}
