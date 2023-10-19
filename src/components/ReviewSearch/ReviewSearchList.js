import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewWrite from "../ReviewWriteForm/ReviewWrite";
import Rating from "../Review/Rating";
import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
// import { likeClick, getLikeClick } from "../../api_원본";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit, onLikeClick }) {
  const handleDeleteClick = () => {
    onDelete(item.aid);
  };

  const {
    title,
    teachRating,
    curriclmRating,
    serviceRating,
    convRating,
    costRating,
    avgRating,
    date,
    content,
    ac_name,
    ac_title,
    ac_userNickname,
    article_id,
  } = item;
  const handleEditClick = () => {
    onEdit(item.aid);
  };

  const [likeCount, setLikeCount] = useState(item.likeCount);
  const [likeClicked, setLikeClicked] = useState(item.likeClick === 1);

  // const handleLikeClick = async () => {
  //   try {
  //     console.log("handleLikeClick 함수 호출됨");
  //     // 클라이언트에서 서버에 보낼 좋아요 클릭 상태
  //     const newLikeClick = likeClicked ? 0 : 1;
  //     console.log("새로운 좋아요 상태:", newLikeClick);
  //     // 서버에 좋아요 상태 전송 (프론트엔드에서 로그인 처리가 필요)
  //     // 예를 들어, 서버로 요청을 보내는 API 함수를 호출
  //     setLikeClicked(!likeClicked);

  //     // 좋아요 수 업데이트
  //     setLikeCount((prevCount) =>
  //       likeClicked ? prevCount - 1 : prevCount + 1
  //     );

  //     await likeClick(item.aid, newLikeClick);
  //     console.log("API 함수 호출:", likeClick);

  //     // 좋아요 상태가 변경됨을 알리고 UI 업데이트
  //     onLikeClick(item.aid, !likeClicked);
  //   } catch (error) {
  //     console.error("Failed to update like:", error);
  //   }
  // };

  // // 이펙트 훅을 사용하여 초기 상태 설정
  // useEffect(() => {
  //   // 해당 리뷰의 likeClick 값을 가져와서 likeCount 상태를 업데이트
  //   const fetchLikeClick = async () => {
  //     try {
  //       const likeClickValue = await getLikeClick(item.aid);
  //       // -1 상태를 0으로 변경
  //       setLikeCount(likeClickValue === -1 ? 0 : likeClickValue);
  //     } catch (error) {
  //       console.error("Failed to fetch like click:", error);
  //     }
  //   };

  //   fetchLikeClick(); // 가져온 값으로 likeCount 상태를 업데이트
  // }, [item.aid]); // item.aid가 변경될 때마다 실행

  const [expanded, setExpanded] = React.useState(false); // 리뷰 더보기

  const handleChange = (panel) => (event, isExpanded) => {
    // 리뷰 더보기
    setExpanded(isExpanded ? panel : false);
  };

  const accordionStyle = {
    width: "800px",
    margin: "0 auto",
    marginBottom: "16px",
    marginTop: "16px",
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      style={accordionStyle}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ marginBottom: "-40px" }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ marginBottom: "15px" }}
          >
            <Avatar src="/broken-image.jpg">{ac_userNickname[0]}</Avatar>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {/* 평균별점 보임 */}
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  {avgRating.toFixed(1)}
                </Typography>
                <Rating value={avgRating} />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "14px" }}
                >
                  {formatDate(date)}
                  <br />[{ac_name} 학원] {ac_title}
                  <br />
                  <Typography
                    variant="h5"
                    component="div"
                    color="black"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      flex: 1,
                    }}
                  >
                    {title}
                  </Typography>
                </Typography>
              </div>
            </div>
          </Stack>
        </CardContent>
      </AccordionSummary>
      <AccordionDetails>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  강 의 력
                </Typography>
                <Rating value={teachRating} sx={{ fontSize: "20px" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "130px",
                  gap: "14px",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  커리큘럼
                </Typography>
                <Rating value={curriclmRating} sx={{ fontSize: "20px" }} />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  서 비 스
                </Typography>
                <Rating value={serviceRating} sx={{ fontSize: "20px" }} />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  편 의 성
                </Typography>
                <Rating value={convRating} sx={{ fontSize: "20px" }} />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  가 성 비
                </Typography>
                <Rating value={costRating} sx={{ fontSize: "20px" }} />
              </div>
            </div>
            <Link
              to={`/acareviewinfo/${article_id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  flexBasis: "100%",
                  marginLeft: "20px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "14px", width: "100%" }}
                >
                  {content}
                </Typography>
              </div>
            </Link>
          </div>
          <Stack direction="row" spacing={1} sx={{ marginTop: "12px" }}>
            <Button
              variant="text"
              onClick={handleEditClick}
              sx={{ fontSize: "13px", fontWeight: "bold" }}
            >
              수정
            </Button>
            <Button
              variant="text"
              onClick={() => {
                handleDeleteClick();
                window.location.reload();
              }}
              sx={{ fontSize: "13px", fontWeight: "bold" }}
            >
              삭제
            </Button>
          </Stack>
          <span
            // onClick={handleLikeClick}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "4px",
              marginLeft: "auto",
            }}
          >
            {likeClicked ? (
              <FavoriteSharpIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderSharpIcon sx={{ color: "red" }} />
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "12px" }}
            >
              {likeCount}명에게 도움되었어요
            </Typography>
          </span>
        </CardContent>
      </AccordionDetails>
    </Accordion>
  );
}

// function ReviewSearchList({ items, onUpdate, onUpdateSuccess, onDelete }) {
function ReviewSearchList({ items }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "0 16 px ",
        border: "1px solid rgba(0 ,0 ,0 , 0.1)",
        backgroundColor: "#FFFFFF",

        // 반응형 스타일
        "@media (max-width: 768px)": {
          padding: "0",
        },
      }}
    >
      {items.map((item) => {
        // 10-11 나중에 추가해야할 리뷰 수정
        // if (item.aid === editingId) {
        //   const {
        //     aid,
        //     img,
        //     title,
        //     teachRating,
        //     curriclmRating,
        //     serviceRating,
        //     convRating,
        //     costRating,
        //     avgRating,
        //     content,
        //   } = item;
        //   const initialValues = {
        //     title,
        //     teachRating,
        //     curriclmRating,
        //     serviceRating,
        //     convRating,
        //     costRating,
        //     avgRating,
        //     content,
        //   };
        //   const handleSubmit = (formData) => onUpdate(aid, formData);
        //   const handleSubmitSuccess = (review) => {
        //     onUpdateSuccess(review);
        //     setEditingId(null);
        //   };
        //   return (
        //     <div key={item.aid}>
        //       <ReviewWrite
        //         initialValues={initialValues}
        //         initialPreview={img}
        //         onSubmit={handleSubmit}
        //         onSubmitSuccess={handleSubmitSuccess}
        //         onCancel={handleCancel}
        //       />
        //     </div>
        //   );
        // }
        return (
          <div key={item.aid}>
            <ReviewListItem
              item={item}
              // onDelete={onDelete}
              onEdit={() => setEditingId(item.aid)}
            />
          </div>
        );
      })}
    </Box>
  );
}

export default ReviewSearchList;