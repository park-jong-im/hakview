import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "./ReviewList";
import {
  getReview,
  updateReview,
  deleteReview,
  likeClick,
} from "../../api_원본";
import Button from "@mui/material/Button";
import ModeIcon from "@mui/icons-material/Mode";
import AverageString from "./AverageString";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { review_api } from "../../Api";

const LIMIT = 5; // 페이지당 보이는 갯수

function ReviewMain() {
  const [order, setOrder] = useState("date"); // 정렬 항목
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [hasNext, setHasNext] = useState(false); //추가페이지 존재여부
  const [items, setItems] = useState([]);
  console.log(items);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setIsLoadingError] = useState(null);
  const [averageRatings, setAverageRatings] = useState({
    teachRatingAvg: 0,
    curriclmRatingAvg: 0,
    serviceRatingAvg: 0,
    convRatingAvg: 0,
    costRatingAvg: 0,
  });

  const [totalPages, setTotalPages] = useState(1);

  // 파라미터
  const { postId } = useParams();

  // 최신순 정렬 클릭 핸들러
  const handleNewestClick = () => {
    setOrder("date"); // 정렬 옵션을 'date'로 설정
  };

  // 평점순 정렬 클릭 핸들러
  const handleBestClick = () => {
    setOrder("avgRating"); // 정렬 옵션을 'avgRating'으로 설정
  };
  // 페이지 변경 핸들러
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.aid === review.aid);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  async function fetchData() {
    try {
      const result = await review_api.acreview2(postId);

      setItems(result);
      console.log("리뷰템" + items)
      // const { paging } = result;
      // let parsePaging = JSON.parse(paging);
      // setHasNext(parsePaging.hasNext);

      // // Update the total pages when fetching new data
      // const totalItems = parsePaging.total;
      // const calculatedTotalPages = Math.ceil(totalItems / LIMIT);
      // setTotalPages(calculatedTotalPages);

      // 각 항목의 평균값 계산
      const totalTeachRating = result.reduce(
        (acc, item) => acc + item.starpoint1,
        0
      );

      console.log("토탈토탈토탈ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ" + totalTeachRating)
      const totalCurriclmRating = result.reduce(
        (acc, item) => acc + item.starpoint2,
        0
      );
      const totalServiceRating = result.reduce(
        (acc, item) => acc + item.starpoint3,
        0
      );
      const totalConvRating = result.reduce(
        (acc, item) => acc + item.starpoint4,
        0
      );
      const totalCostRating = result.reduce(
        (acc, item) => acc + item.starpoint5,
        0
      );
      const totalCount = result.length;

      // 평균값 설정
      setAverageRatings({
        teachRatingAvg: totalTeachRating / totalCount,
        curriclmRatingAvg: totalCurriclmRating / totalCount,
        serviceRatingAvg: totalServiceRating / totalCount,
        convRatingAvg: totalConvRating / totalCount,
        costRatingAvg: totalCostRating / totalCount,
      });
    } catch (error) {
      setIsLoadingError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // fetchData 함수가 실행되도록 useEffect를 수정합니다.
  useEffect(() => {
    fetchData(); // order 또는 currentPage가 변경될 때 fetchData 함수를 실행
  }, [order, currentPage]);

  const totalAverageRating =
    (averageRatings.teachRatingAvg +
      averageRatings.curriclmRatingAvg +
      averageRatings.serviceRatingAvg +
      averageRatings.convRatingAvg +
      averageRatings.costRatingAvg) /
    5;

  return (
    <div>
      <div>
        <Box
          sx={{
            width: "100%",
            maxWidth: "700px",
            margin: "0 auto",
            padding: "0 16px",
            border: "0px solid rgba(0 ,0 ,0 , 0.1)",
            "@media (max-width: 768px)": {
              padding: "0",
            },
          }}
        >
          <div>
            <h2>학원 후기</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h4>학원 후기를 작성해주세요!</h4>
            <Link to={`/ReviewWriteForm/${postId}`}>
              <Button
                variant="contained"
                color="primary"
                className="button"
                sx={{
                  mt: 3,
                  mb: 4,
                  backgroundImage:
                    "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
                  color: "white",
                  fontSize: "15px",
                  width: "auto",
                }}
              >
                <div style={{ marginRight: "5px" }}>
                  <ModeIcon />
                </div>
                후기 작성 하기
              </Button>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StarIcon style={{ color: "gold", fontSize: 50 }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  {totalAverageRating.toFixed(1)}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" component="p">
                  전체 평균 점수
                </Typography>
              </div>
            </div>
            <AverageString
              teachRatingAvg={averageRatings.teachRatingAvg}
              curriclmRatingAvg={averageRatings.curriclmRatingAvg}
              serviceRatingAvg={averageRatings.serviceRatingAvg}
              convRatingAvg={averageRatings.convRatingAvg}
              costRatingAvg={averageRatings.costRatingAvg}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewestClick}
              className="button"
              sx={{
                mt: 3,
                mb: 4,
                backgroundImage:
                  "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
                color: "white",
                fontSize: "12px",
                marginRight: "10px",
              }}
            >
              최신순 정렬
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBestClick}
              className="button"
              sx={{
                mt: 3,
                mb: 4,
                backgroundImage:
                  "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
                color: "white",
                fontSize: "12px",
              }}
            >
              평점순 정렬
            </Button>
          </div>
        </Box>

        <ReviewList
          items={items}
          onUpdate={updateReview}
          onDelete={deleteReview}
          onUpdateSuccess={handleUpdateSuccess}
          onLikeClick={likeClick}
        />
        <Stack
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={Math.ceil(totalPages.length / LIMIT)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="secondary"
          />
        </Stack>
      </div>
    </div>
  );
}

export default ReviewMain;
