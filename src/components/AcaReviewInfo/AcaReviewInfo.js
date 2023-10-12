import * as React from "react";
import { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReviewMain from "../Review/ReviewMain";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import Footer from "../../Footer";
import StarIcon from "@mui/icons-material/Star";
import { getReview } from "../../api";
import AcademyInfo from "./AcademyInfo";
import { useLocation } from "react-router-dom";
import Header from "../../Header";

function AcaReviewInfo() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTabValue = params.get("tab") || "1";
  const [value, setValue] = React.useState(initialTabValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [averageRatings, setAverageRatings] = useState({
    teachRatingAvg: 0,
    curriclmRatingAvg: 0,
    serviceRatingAvg: 0,
    convRatingAvg: 0,
    costRatingAvg: 0,
  });

  async function fetchData() {
    try {
      const result = await getReview({
        order: "avgRating", // 평점 순으로 정렬 요청
        offset: 0,
        limit: 100, // 모든 데이터를 가져옵니다.
      });

      // 각 항목의 평균값 계산
      const totalTeachRating = result.news.reduce(
        (acc, item) => acc + item.teachRating,
        0
      );
      const totalCurriclmRating = result.news.reduce(
        (acc, item) => acc + item.curriclmRating,
        0
      );
      const totalServiceRating = result.news.reduce(
        (acc, item) => acc + item.serviceRating,
        0
      );
      const totalConvRating = result.news.reduce(
        (acc, item) => acc + item.convRating,
        0
      );
      const totalCostRating = result.news.reduce(
        (acc, item) => acc + item.costRating,
        0
      );
      const totalCount = result.news.length;

      // 평균값 설정
      setAverageRatings({
        teachRatingAvg: totalTeachRating / totalCount,
        curriclmRatingAvg: totalCurriclmRating / totalCount,
        serviceRatingAvg: totalServiceRating / totalCount,
        convRatingAvg: totalConvRating / totalCount,
        costRatingAvg: totalCostRating / totalCount,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const totalAverageRating =
    (averageRatings.teachRatingAvg +
      averageRatings.curriclmRatingAvg +
      averageRatings.serviceRatingAvg +
      averageRatings.convRatingAvg +
      averageRatings.costRatingAvg) /
    5;

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16 px ",
          border: "1px solid rgba(0 ,0 ,0 , 0.1)",

          // 반응형 스타일
          "@media (max-width: 768px)": {
            padding: "0",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
            marginBottom: "30px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ marginBottom: "15px" }}
          >
            <SchoolRoundedIcon style={{ fontSize: 80, color: "#311b92" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "30px", fontWeight: "bold" }}
                >
                  주연테크 생각하는 수학원
                </Typography>
                <VerifiedRoundedIcon
                  style={{ fontSize: 44, color: "#7c4dff" }}
                />
              </div>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "16px" }}
              >
                부산 동래구 안남로 149 TEL. 031-207-23355
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StarIcon style={{ color: "gold", fontSize: 30 }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  {totalAverageRating.toFixed(1)}
                </Typography>
              </div>
            </div>
          </Stack>
        </div>

        {/* 학원 소개 / 후기 탭 부분 */}
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab
                value="1"
                sx={{ fontSize: "17px" }}
                label="&nbsp;&nbsp;&nbsp;&nbsp;학원 소개&nbsp;&nbsp;&nbsp;&nbsp;"
              />
              <Tab
                value="2"
                sx={{ fontSize: "17px" }}
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;후기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AcademyInfo />
          </TabPanel>
          <TabPanel value="2">
            <ReviewMain />
          </TabPanel>
        </TabContext>
      </Box>
      <Footer />
    </>
  );
}

export default AcaReviewInfo;
