import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { getReview, updateReview, deleteReview, likeClick } from "../../api";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CommentWrite from "./CommentWrite";
import { createReview } from "../../api";

const LIMIT = 5; // 페이지당 보이는 갯수

function CommentForm() {
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

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
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
      const result = await getReview({
        offset: (currentPage - 1) * LIMIT,
        limit: LIMIT,
      });

      setItems(result.news);
      const { paging } = result;
      let parsePaging = JSON.parse(paging);
      setHasNext(parsePaging.hasNext);

      // Update the total pages when fetching new data
      const totalItems = parsePaging.total;
      const calculatedTotalPages = Math.ceil(totalItems / LIMIT);
      setTotalPages(calculatedTotalPages);

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
        ></Box>

        <CommentList
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

      <CommentWrite
        onSubmit={createReview}
        onSubmitSuccess={handleCreateSuccess}
      />
    </div>
  );
}

export default CommentForm;
