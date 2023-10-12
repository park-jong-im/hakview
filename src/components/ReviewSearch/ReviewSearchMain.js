import React, { useEffect, useState } from "react";
import ReviewSearchList from "./ReviewSearchList";
import { getReview, updateReview, deleteReview, likeClick } from "../../api";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ReviewSearchBar from "./ReviewSearchBar";
import Footer from "../../Footer";
import Header from "../../Header";

const LIMIT = 7; // 페이지당 보이는 갯수

function ReviewSearchMain() {
  const [order, setOrder] = useState("date"); // 정렬 항목
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [hasNext, setHasNext] = useState(false); //추가페이지 존재여부
  const [items, setItems] = useState([]);
  console.log(items);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setIsLoadingError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);

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
      setIsLoading(true);
      setIsLoadingError(null);

      // order 값을 기반으로 적절한 정렬 값을 서버에 전달합니다.
      let orderBy = order;
      if (orderBy === "date") {
        // 최신순 정렬을 위한 서버 정렬 값
        orderBy = "date"; // 또는 서버에서 요구하는 정렬 값으로 수정
      } else if (orderBy === "avgRating") {
        // 평점순 정렬을 위한 서버 정렬 값
        orderBy = "avgRating"; // 또는 서버에서 요구하는 정렬 값으로 수정
      }

      const result = await getReview({
        order: orderBy, // 평점 순으로 정렬 요청
        offset: (currentPage - 1) * LIMIT,
        limit: LIMIT,
      });

      // result.news 배열을 평점순으로 정렬
      result.news.sort((a, b) => b.avgRating - a.avgRating);

      setItems(result.news);
      const { paging } = result;
      let parsePaging = JSON.parse(paging);
      setHasNext(parsePaging.hasNext);

      // Update the total pages when fetching new data
      const totalItems = parsePaging.total;
      const calculatedTotalPages = Math.ceil(totalItems / LIMIT);
      setTotalPages(calculatedTotalPages);
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

  return (
    <div>
      <Header />
      <div>
        <Box
          sx={{
            width: "100%",
            maxWidth: "700px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column", // 컨테이너 내부 요소를 세로로 배치
            alignItems: "center", // 가운데 정렬
            padding: "0 16px",
            border: "0px solid rgba(0 ,0 ,0 , 0.1)",
            "@media (max-width: 768px)": {
              padding: "0",
            },
          }}
        >
          <ReviewSearchBar />
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
                marginLeft: "460px",
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
        {isLoading ? (
          <p>Loading...</p>
        ) : loadingError ? (
          <p>Error: {loadingError.message}</p>
        ) : (
          <>
            <ReviewSearchList
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
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                color="secondary"
              />
            </Stack>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ReviewSearchMain;
