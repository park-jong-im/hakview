import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Acprofile from "./AcProfile";
// import Divider from "@mui/material/Divider";
// import Grid from "@mui/material/Grid";
import Header from "../../Header";
import AcModification from "./AcModification";
import MyLikeList from "./MyLikeList";

const sections = [
  { title: "학원 정보", url: "#" },
  { title: "리뷰", url: "#" },
  { title: "자유 게시판", url: "#" },
  { title: "마이페이지", url: "#" },
];

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 login-token을 확인합니다.
    const loginToken = localStorage.getItem("login-token");
    if (!loginToken) {
      alert("마이페이지는 로그인이 필요합니다!");
      navigate("/login"); // /login 페이지로 이동
    }
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("newValue", value);
  };

  return (
    <Typography>
      <Header
        title="Main"
        sections={sections}
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, backgroundColor: "white" }}
      />
      <Box sx={{ display: "flex", maxWidth: "1000px", mt: 2, ml: 50 }}>
        {/* 사이드 메뉴 */}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {/* 마이페이지 탭 */}
          <Tab
            label="마이페이지"
            {...a11yProps(0)}
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
            onClick={() => setValue(0)}
          />

          {/* 회원정보 수정 탭 */}
          <Tab label="회원정보 수정" {...a11yProps(1)} />

          {/* 내가 찜한 목록 탭 */}
          <Tab label="내가 찜한 목록" {...a11yProps(2)} />
        </Tabs>

        {/* 마이페이지 컨텐츠 */}
        <Box sx={{ flexGrow: 1 }}>
          {/* 마이페이지 패널 */}
          <TabPanel value={value} index={0}>
            <Acprofile />
          </TabPanel>

          {/* 회원정보 수정 패널 */}
          <TabPanel value={value} index={1}>
            <AcModification setValue={setValue} />
          </TabPanel>

          {/* 내가 찜한 목록 패널 */}
          <TabPanel value={value} index={2}>
            <MyLikeList />
          </TabPanel>
        </Box>
      </Box>
      <Copyright sx={{ pt: 4 }} />
    </Typography>
  );
}
