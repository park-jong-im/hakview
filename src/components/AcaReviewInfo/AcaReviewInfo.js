import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { getReview } from "../../api_원본";
import AcademyInfo from "./AcademyInfo";
import { useLocation } from "react-router-dom";
import Header from "../../Header";

import { article_api, review_api } from "../../Api"

function AcaReviewInfo() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTabValue = params.get("tab") || "1";
  const [value, setValue] = React.useState(initialTabValue);

  // 파라미터
  const { postId } = useParams();

  // 학원 데이터
  const [serial, setSerial] = useState(postId);
  const [ac_name, setAc_name] = useState("");
  const [ac_address, setAc_address] = useState("");
  const [ac_phone, setAc_phone] = useState("");
  const [ac_title, setAc_title] = useState("");
  const [ac_body, setAc_body] = useState("");

  // 리뷰 데이터
  const [reviewData, setReviewData] = useState([]);

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

  async function fetchData1() {
    const response = await article_api.one(postId);
    setSerial(response.serial);
    setAc_name(response.ac_name);
    setAc_address(response.ac_address);
    setAc_phone(response.ac_phone);
    setAc_title(response.articleTitle);
    setAc_body(response.articleBody);
    console.log(ac_title);
    console.log(ac_body);
  }

  async function fetchData2() {

    try {

      const reviewRow = await review_api.acreview1(postId);
      setReviewData(reviewRow);

      // 각 항목의 평균값 계산
      const totalTeachRating = reviewData.reduce(
        (acc, item) => acc + item.starpoint1,
        0
      );

      const totalCurriclmRating = reviewData.reduce(
        (acc, item) => acc + item.starpoint2,
        0
      );
      const totalServiceRating = reviewData.reduce(
        (acc, item) => acc + item.starpoint3,
        0
      );
      const totalConvRating = reviewData.reduce(
        (acc, item) => acc + item.starpoint4,
        0
      );
      const totalCostRating = reviewData.reduce(
        (acc, item) => acc + item.starpoint5,
        0
      );
      const totalCount = reviewData.length;

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
    fetchData2();
  }, [serial]);

  useEffect(() => {
    fetchData1();
  }, [serial]);

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
                  {ac_name} 학원
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
                {ac_address}<br />
                TEL. {ac_phone}
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
            <AcademyInfo
              ac_address={ac_address}
              ac_phone={ac_phone}
              ac_title={ac_title}
              ac_body={ac_body}
            />
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
