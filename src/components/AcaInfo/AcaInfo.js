import React from "react";
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

function AcaInfo() {
  const {
    handleNewestClick,
    handleBestClick,
    handleDelete,
    handleUpdateSuccess,
    sortedItems,
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
    suheomClick1,
    suheomClick2,
    suheomClick3,
    suheomClick4,
    suheomClick5,
    licenceClick1,
    licenceClick2,
    licenceClick3,
    closeAllModal,
    closeSuheomModal,
    closeLicenceModal,
    handleMouseEnter,
    handleMouseLeave,
  } = ModalHamsu();

  const defaultTheme = createTheme();

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg">
          <Header />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ReviewSearchBar />
          </div>
          <BodyContainer style={{ marginTop: "3px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <CustomButton onClick={openAllModal} clicked={allButtonClicked}>
                  전체
                </CustomButton>

                <CustomButton
                  onClick={openSuheomModal}
                  clicked={suheomButtonClicked}
                >
                  수험
                </CustomButton>

                <CustomButton
                  onClick={openLicenceModal}
                  clicked={licenceButtonClicked}
                >
                  자격증
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
                items={sortedItems}
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
                  <p>전체 검색 옵션 내용</p>
                </li>
                <br />
              </TableDesign>
            </ModalTest>
          )}
          {isSuheomModalOpen && (
            <ModalTest onClose={closeSuheomModal}>
              <h2 style={{ margin: "3px" }}>수험 검색</h2>
              <TableDesign>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={suheomClick1}>수학</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={suheomClick2}>영어</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={suheomClick3}>국어</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={suheomClick4}>과학</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p onClick={suheomClick5}>사회</p>
                  </div>
                </li>
                <br />
              </TableDesign>
            </ModalTest>
          )}
          {isLicenceModalOpen && (
            <ModalTest onClose={closeLicenceModal}>
              <h2 style={{ margin: "3px" }}>자격증 검색</h2>
              <TableDesign>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={licenceClick1}
                  >
                    <p>국가기술자격증</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={licenceClick2}
                  >
                    <p>국가전문자격증</p>
                  </div>
                </li>
                <li>
                  <div
                    style={{ backgroundColor: "initial" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={licenceClick3}
                  >
                    <p>민간자격증</p>
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
