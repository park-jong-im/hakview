import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import DeleteAccount from "./DeleteAccount";
import Box from "@mui/material/Box";

const account = [
  { text: "아이디 : ", key: "like1000" },
  { text: "닉네임 : ", key: "개미왕" },
  { text: "비밀번호 : ", key: "1234" },
  { text: "생년월일 : ", key: "2023-10-10?" },
  { text: "전화번호 : ", key: "010-0000-0000" },
];

export default function UserProfile() {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 650,
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
            <PersonRoundedIcon sx={{ fontSize: 120 }} />
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
                {/* 이 부분에 mr (margin-right) 속성을 추가했습니다 */}
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
