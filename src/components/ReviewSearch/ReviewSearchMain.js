import React, { useEffect, useState } from "react";
import ReviewSearchList from "./ReviewSearchList";
// import {
//   // getReview,
//   updateReview,
//   deleteReview,
//   likeClick,
// } from "../../api_원본";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ReviewSearchBar from "./ReviewSearchBar";
import Footer from "../../Footer";
import Header from "../../Header";
import { review_api } from "../../Api";
import { OtherHouses } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const LIMIT = 7; // 페이지당 보이는 갯수

function ReviewSearchMain() {
  const location = useLocation();
  const category = location.state?.search || ""; // 데이터를 가져오고, 없으면 빈 문자열로 초기화

  const [order, setOrder] = useState("date"); // 정렬 항목
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [hasNext, setHasNext] = useState(false); //추가페이지 존재여부
  const [items, setItems] = useState([]);
  console.log(items);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setIsLoadingError] = useState(null);

  // 검색한 단어 저장
  const [search, setSearch] = useState(category);

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



  // 검색 결과를 처리하는 함수
  const handleSearchResult = (searchResult) => {
    setCurrentPage(1);
    // 이 함수 내에서 검색 결과를 처리합니다.
    setSearch(searchResult);
  };

  // useEffect(() => {
  //   // 페이지가 로드될 때 API를 호출하여 데이터를 가져옵니다.
  //   const fetchData = async () => {
  //     try {
  //       const reviewList = await review_api.list(currentPage);
  //       console.log(reviewList)
  //       // API 데이터를 initialRows 배열의 형식으로 변환합니다.
  //       const formattedData = reviewList.content.map(item => ({
  //         aid: item.reviewSerial,
  //         title: item.reviewTitle,
  //         content: item.body,
  //         starpoint1: item.teachRating,
  //         starpoint3: item.curriclmRating,
  //         starpoint2: item.serviceRating,
  //         starpoint4: item.convRating,
  //         starpoint5: item.costRating
  //         // date: item.createdAt.split(' ')[0],
  //       }));

  //       setTotalPages(reviewList.totalPages);

  //       setItems(formattedData); // 변환한 데이터를 rows 상태에 설정합니다.
  //     } catch (error) {
  //       console.error('에러:', error);
  //     }
  //   };

  //   fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
  // }, [currentPage]);


  async function fetchData() {
    try {
      setIsLoading(true);
      setIsLoadingError(null);

      // order 값을 기반으로 적절한 정렬 값을 서버에 전달합니다.
      // let orderBy = order;
      // if (orderBy === "date") {
      //   // 최신순 정렬을 위한 서버 정렬 값
      //   orderBy = "date"; // 또는 서버에서 요구하는 정렬 값으로 수정
      // } else if (orderBy === "avgRating") {
      //   // 평점순 정렬을 위한 서버 정렬 값
      //   orderBy = "avgRating"; // 또는 서버에서 요구하는 정렬 값으로 수정
      // }

      // const result = await getReview({
      //   order: orderBy, // 평점 순으로 정렬 요청
      //   offset: (currentPage - 1) * LIMIT,
      //   limit: LIMIT,
      // });
      const reviewList = await review_api.search(search, currentPage);
      console.log(currentPage)
      const formattedData = reviewList.content.map(item => ({
        aid: item.reviewSerial,
        title: item.reviewTitle,
        content: item.body,
        teachRating: item.starpoint1,
        curriclmRating: item.starpoint2,
        serviceRating: item.starpoint3,
        convRating: item.starpoint4,
        costRating: item.starpoint5,
        avgRating: item.avgstarpoint,
        date: item.createdAt.split(' ')[0],
        ac_name: item.ac_name,
        ac_title: item.ac_title,
        ac_userNickname: item.ac_userNickname,
        article_id: item.article_id

      }));


      // result.news 배열을 평점순으로 정렬
      // result.news.sort((a, b) => b.avgRating - a.avgRating);
      console.log(search);
      setItems(formattedData);
      // const { paging } = result;
      // let parsePaging = JSON.parse(paging);
      // setHasNext(parsePaging.hasNext);

      // // Update the total pages when fetching new data
      // const totalItems = parsePaging.total;
      // const calculatedTotalPages = Math.ceil(totalItems / LIMIT);
      setTotalPages(reviewList.totalPages);
    } catch (error) {
      setIsLoadingError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // fetchData 함수가 실행되도록 useEffect를 수정합니다.
  useEffect(() => {
    fetchData(); // order 또는 currentPage가 변경될 때 fetchData 함수를 실행
  }, [currentPage, search]);

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
          <ReviewSearchBar onSearch={handleSearchResult} />
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
          <div>Error: {loadingError.message}</div>
        ) : (
          <>
            <ReviewSearchList
              items={items}
              // onUpdate={updateReview}
              // onDelete={deleteReview}
              onUpdateSuccess={handleUpdateSuccess}
            // onLikeClick={likeClick}
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
