import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AcaInfoHamsu from "./AcaInfoHamsu";
import AcaList from "./AcaList";

import ModalTest from "../AcaInfoModal/Modal";
import ModalHamsu from "../AcaInfoModal/ModalHamsu";

import { BodyContainer, CustomButton, TableDesign } from "./AcaInfo.element"; // 스타일 import
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Container from "@mui/material/Container";
import Header from "../../Header";
import Footer from "../../Footer";

import ReviewSearchBar from "../ReviewSearch/ReviewSearchBar";
import { useLocation } from "react-router-dom";

import { article_api } from "../../Api";

function AcaInfo() {
  const {
    handleNewestClick,
    handleBestClick,
    handleDelete,
    handleUpdateSuccess,
    sortedItems,
    items,
    updateReview,
    currentPage,
    handlePageChange,
  } = AcaInfoHamsu();

  const {
    allButtonClicked,
    suheomButtonClicked,
    licenceButtonClicked,
    openAllModal,
    openSuheomModal,
    openLicenceModal,
    isAllModalOpen,
    isSuheomModalOpen,

    isLicenceModalOpen,
    mainClick,
    suheomClick,
    licenceClick,
    closeAllModal,
    closeSuheomModal,
    closeLicenceModal,
    handleMouseEnter,
    handleMouseLeave,
    tagSearch,
  } = ModalHamsu();

  const defaultTheme = createTheme();
  const location = useLocation();
  const category = location.state?.search || ""; // 데이터를 가져오고, 없으면 빈 문자열로 초기화

  const [search, setSearch] = useState(category);
  const [realItems, setRealItems] = useState([]);

  const handleSearchResult = (searchResult) => {
    // 이 함수 내에서 검색 결과를 처리합니다.
    setSearch(searchResult);
  };

  useEffect(() => {
    async function fetchData() {
      // setIsLoading(true);
      // setIsLoadingError(null);

      const articleList = await article_api.search(search, 1);
      console.log(articleList);
      const formattedData = articleList.content.map((item) => ({
        aid: item.articleSerial,
        title: item.articleTitle,
        content: item.body,
        ac_name: item.ac_name,
        ac_address: item.ac_address,
        tag1: item.tag1,
        tag2: item.tag2,
        tag3: item.tag3,
        date: item.createdAt.split(" ")[0],
      }));
      setRealItems(formattedData);
      console.log(formattedData);

      // const result = await getReview({ order, offset: 0, limit: LIMIT });
      // setCurrentPage(1);
      // console.log(result);
      // setItems(result.news);
      // const { paging } = result;
      // setOffset(LIMIT); // 시작 위치 설정
      // let parsePaging = JSON.parse(paging);
      // setHasNext(parsePaging.hasNext);
    }

    fetchData();
  }, [search]);

  useEffect(() => {
    async function fetchData2() {
      const formattedData = tagSearch.map((item) => ({
        aid: item.articleSerial,
        title: item.articleTitle,
        content: item.body,
        ac_name: item.ac_name,
        ac_address: item.ac_address,
        tag1: item.tag1,
        tag2: item.tag2,
        tag3: item.tag3,
        date: item.createdAt.split(" ")[0],
      }));
      setRealItems(formattedData);
    }
    fetchData2();
  }, [tagSearch]);

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg">
          <Header />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReviewSearchBar onSearch={handleSearchResult} />
          </div>
          <BodyContainer style={{ marginTop: "3px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <CustomButton onClick={openAllModal} clicked={allButtonClicked}>
                  메인
                </CustomButton>

                <CustomButton
                  onClick={openSuheomModal}
                  clicked={suheomButtonClicked}
                >
                  과목
                </CustomButton>

                <CustomButton
                  onClick={openLicenceModal}
                  clicked={licenceButtonClicked}
                >
                  세부과목
                </CustomButton>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "60px",
                  marginTop: "10px",
                }}
              >
                <CustomButton onClick={handleNewestClick}>최신순</CustomButton>
                <CustomButton onClick={handleBestClick}>
                  평점 높은순
                </CustomButton>
              </div>
            </div>
            <Stack spacing={2} alignItems="center">
              <AcaList
                items={realItems}
                onUpdate={updateReview}
                onUpdateSuccess={handleUpdateSuccess}
                onDelete={handleDelete}
              />

              <Pagination
                count={5}
                page={currentPage} // 현재 페이지 설정
                variant="outlined"
                color="secondary"
                onChange={handlePageChange}
                sx={{
                  mt: 3,
                  mb: 2,
                  ml: "350px",
                  color: "white",
                  fontSize: "12px",
                  width: "auto",
                }}
              />
            </Stack>
          </BodyContainer>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/AcaWriteForm" style={{ textDecoration: "none" }}>
              <CustomButton>학원 등록</CustomButton>
            </Link>
          </div>
          {isAllModalOpen && (
            <ModalTest onClose={closeAllModal}>
              <h2 style={{ margin: "3px" }}>전체 검색</h2>
              <TableDesign>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={() => mainClick("수험")}>수험</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={() => mainClick("자격증")}>자격증</p>
                  </div>
                </li>
                <br />
              </TableDesign>
            </ModalTest>
          )}
          {isSuheomModalOpen && (
            <ModalTest onClose={closeSuheomModal}>
              <h2 style={{ margin: "3px" }}>과목 필터링</h2>
              <TableDesign>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={() => suheomClick("국어")}>국어</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={() => suheomClick("수학")}>수학</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={() => suheomClick("전기")}>전기</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={() => suheomClick("IT")}>IT</p>
                  </div>
                </li>
                <br />
              </TableDesign>
            </ModalTest>
          )}
          {isLicenceModalOpen && (
            <ModalTest onClose={closeLicenceModal}>
              <h2 style={{ margin: "3px" }}>세부 필터링</h2>
              <TableDesign>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => licenceClick("국어1")}
                  >
                    <p>국어1</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => licenceClick("국어2")}
                  >
                    <p>국어2</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => licenceClick("수학1")}
                  >
                    <p>수학1</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => licenceClick("수학2")}
                  >
                    <p>수학2</p>
                  </div>
                </li>

                <br />
              </TableDesign>
            </ModalTest>
          )}
        </Container>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default AcaInfo;
