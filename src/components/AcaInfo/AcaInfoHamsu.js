import { useState, useEffect } from "react";
import { getReview, updateReview, deleteReview } from "../../api_원본";
import { article_api } from "../../Api";

function AcaInfoHamsu() {
  const LIMIT = 6; //페이지당 보이는 갯수

  const [order, setOrder] = useState("date"); //정렬 항목
  const [offset, setOffset] = useState(0); //시작위치
  const [hasNext, setHasNext] = useState(false); //추가페이지 존재여부

  const [items, setItems] = useState([]);
  // console.log(items);
  const sortedItems = [...items].sort((a, b) => b[order] - a[order]);
  // console.log(sortedItems)

  const [isLoading, setIsLoading] = useState(false); //로딩 처리
  const [loadingError, setIsLoadingError] = useState(null);

  // 검색창 저장
  const [search, setSearch] = useState("");

  const handleNewestClick = () => setOrder("date"); //정렬
  const handleBestClick = () => setOrder("avgRating");

  //삭제
  const handleDelete = async (aid) => {
    try {
      await deleteReview(aid);
      const nextItems = items.filter((item) => item.aid !== aid);
      setItems(nextItems);
    } catch (error) {
      setIsLoadingError(error);
    } finally {
      setIsLoading(false);
    }
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

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 상태로 관리
  // 현재 페이지에서 보이는 리스트 개수
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       setIsLoadingError(null);

  //       const articleList = await article_api.search(search, currentPage);
  //       console.log(articleList)
  //       const formattedData = articleList.content.map(item => ({
  //         aid: item.articleSerial,
  //         title: item.articleTitle,
  //         content: item.body,
  //         ac_name: item.ac_userNickname,
  //         ac_address: item.ac_address,
  //         tag1: item.tag1,
  //         tag2: item.tag2,
  //         tag3: item.tag3,
  //         date: item.createdAt.split(' ')[0],


  //       }));
  //       setItems(formattedData);
  //       console.log(formattedData)

  //       // const result = await getReview({ order, offset: 0, limit: LIMIT });
  //       // setCurrentPage(1);
  //       // console.log(result);
  //       // setItems(result.news);
  //       // const { paging } = result;
  //       // setOffset(LIMIT); // 시작 위치 설정
  //       // let parsePaging = JSON.parse(paging);
  //       // setHasNext(parsePaging.hasNext);
  //     } catch (error) {
  //       setIsLoadingError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [search]);

  // async function fetchDataForPage(page) {
  //   const itemsPerPage = 6;
  //   const startIdx = (page - 1) * itemsPerPage;

  //   try {
  //     // API를 호출하여 데이터 가져오기
  //     const result = await getReview({
  //       order: "date", // 정렬 기준 설정 (원하는 대로 수정)
  //       offset: startIdx, // 시작 위치 설정
  //       limit: itemsPerPage, // 페이지당 아이템 개수 설정
  //     });

  //     // API에서 가져온 데이터의 일부만 추출
  //     console.log(result);
  //     console.log(result.news);
  //     setItems(result.news);

  //     return result.news;
  //   } catch (error) {
  //     console.error("An error occurred while fetching data:", error);
  //     throw error;
  //   }
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       setIsLoadingError(null);

  //       // fetchDataForPage 함수를 사용하여 데이터 가져오기
  //       const newData = await fetchDataForPage(currentPage);
  //       console.log(currentPage);

  //       // 데이터를 상태에 업데이트
  //       setData(newData);

  //       // 이후의 로직을 수행하거나 필요에 따라 다른 작업 수행
  //       // ...
  //     } catch (error) {
  //       setIsLoadingError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    // 페이지 번호가 변경되었을 때 실행될 로직을 작성
    console.log("페이지 번호가 변경됨:", newPage);

    // 현재 페이지 상태를 업데이트
    setCurrentPage(newPage);
  };
  return {
    handleNewestClick,
    handleBestClick,
    handleDelete,
    handleUpdateSuccess,
    hasNext,
    sortedItems,
    items,
    isLoading,
    loadingError,
    updateReview,
    currentPage,
    setCurrentPage,
    data,
    handlePageChange,
  };
}

export default AcaInfoHamsu;
