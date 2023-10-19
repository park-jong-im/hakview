import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";
import ReviewFormRating from "./ReviewFormRating";
import { article_api, review_api } from "../../Api";

const INITIAL_VALUES = {
  title: "",
  body: "",
  starpoint1: 0,
  starpoint2: 0,
  starpoint3: 0,
  starpoint4: 0,
  starpoint5: 0,
  tag1: "",
  tag2: "",
  tag3: "",
  ac_name: "",
  ac_title: "",
  serial: 0,
};

const StyledForm = styled("form")`
  max-width: 500px;
  margin: 0 auto;
  font-size: 14px;
  font-weight: bold;
`;

const StyledDiv = styled("div")`
  display: flex;
  justify-content: center;
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  outline: none;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #2196f3;
  }
`;

export function handleCreateSuccess(review, setItems) {
  setItems((prevItems) => [review, ...prevItems]);
}

export default function ReviewWrite({
  initialValues = INITIAL_VALUES,
  onCancel,
  // onSubmit,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  // 학원정보 저장용
  const [ac_name, setAc_name] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");

  // 파라미터
  const { postId } = useParams();

  // 기존 값을 사용하여 selectedRatings 초기화
  const [selectedRatings, setSelectedRatings] = useState({
    teachRating: initialValues.starpoint1,
    curriclmRating: initialValues.starpoint2,
    serviceRating: initialValues.starpoint3,
    convRating: initialValues.starpoint4,
    costRating: initialValues.starpoint5,
  });

  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      window.location.reload();
    } else {
      navigate(-1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleRatingSelect = (name, value) => {
    setSelectedRatings((prevSelectedRatings) => ({
      ...prevSelectedRatings,
      [name]: value,
    }));
  };

  // 학원정보 불러옴
  async function fetchData() {
    const articleData = await article_api.one(postId);
    console.log(articleData);

    setValues((prevValues) => ({
      ...prevValues,
      ac_name: articleData.ac_name, // ac_name 값을 직접 업데이트
      ac_title: articleData.articleTitle,
      tag1: articleData.tag1,
      tag2: articleData.tag2,
      tag3: articleData.tag3,
      serial: articleData.articleSerial,
    }));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await review_api.write(values);

    // const formData = new FormData();
    // formData.append("title", values.title);
    // formData.append("body", values.body);
    // formData.append("starpoint1", selectedRatings.teachRating);
    // formData.append("starpoint2", selectedRatings.curriclmRating);
    // formData.append("starpoint3", selectedRatings.serviceRating);
    // formData.append("starpoint4", selectedRatings.convRating);
    // formData.append("starpoint5", selectedRatings.costRating);
    // formData.append("tag1", values.tag1);
    // formData.append("tag2", values.tag2);
    // formData.append("tag3", values.tag3);
    // formData.append("ac_title", values.ac_title);
    // formData.append("ac_name", values.ac_name);
    // formData.append("serial", values.serial);
    // console.log(formData);

    // let result;
    // try {
    //   setSubmittingError(null);
    //   setIsSubmitting(true);
    //   result = await onSubmit(formData);
    // } catch (error) {
    //   setSubmittingError(error);
    //   return;
    // } finally {
    //   setIsSubmitting(false);
    // }

    // const { review } = result;
    // setValues(INITIAL_VALUES);
    // onSubmitSuccess(review);
  };

  return (
    <>
      <div>
        <div>
          <h2 style={{ textAlign: "center" }}>후기 작성하기</h2>
        </div>

        <StyledForm className="ReviewForm" onSubmit={handleSubmit}>
          * 학원 이름
          <div style={{ marginBottom: "20px" }}>
            <TextField
              margin="normal"
              name="ac_name"
              disabled
              id="outlined-disabled"
              value={values.ac_name}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </div>
          * 강의 제목
          <div style={{ marginBottom: "20px" }}>
            <TextField
              margin="normal"
              name="ac_title"
              disabled
              id="outlined-disabled"
              value={values.ac_title}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </div>
          * 리뷰 제목
          <div>
            <TextField
              margin="normal"
              name="title"
              label="제목을 입력하세요"
              required
              variant="outlined"
              value={values.title}
              onChange={handleInputChange}
              multiline
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginTop: "20px" }}>* 세부 기준 별점</div>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "4px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4
                style={{ color: "gray", fontSize: "14px", marginRight: "90px" }}
              >
                [1] 강사진의 강의력
              </h4>
              <ReviewFormRating
                name="starpoint1"
                label="[1] 강사진의 강의력"
                value={values.starpoint1}
                onChange={(value) => handleChange("starpoint1", value)}
                onRatingSelect={handleRatingSelect}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4
                style={{ color: "gray", fontSize: "14px", marginRight: "48px" }}
              >
                [2] 커리큘럼·교재의 우수성
              </h4>
              <ReviewFormRating
                name="starpoint2"
                label="[2] 커리큘럼·교재의 우수성"
                value={values.starpoint2}
                onChange={(value) => handleChange("starpoint2", value)}
                onRatingSelect={handleRatingSelect}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4
                style={{ color: "gray", fontSize: "14px", marginRight: "48px" }}
              >
                [3] 상담·의사소통의 원할함
              </h4>
              <ReviewFormRating
                name="starpoint3"
                label="[3] 상담·의사소통의 원할함"
                value={values.starpoint3}
                onChange={(value) => handleChange("starpoint3", value)}
                onRatingSelect={handleRatingSelect}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4
                style={{ color: "gray", fontSize: "14px", marginRight: "50px" }}
              >
                {" "}
                [4] 학사·행정관리의 체계성
              </h4>
              <ReviewFormRating
                name="starpoint4"
                label="[4] 학사·행정관리의 체계성"
                value={values.starpoint4}
                onChange={(value) => handleChange("starpoint4", value)}
                onRatingSelect={handleRatingSelect}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4
                style={{ color: "gray", fontSize: "14px", marginRight: "80px" }}
              >
                {" "}
                [5] 시설·환경의 편의성
              </h4>
              <ReviewFormRating
                name="starpoint5"
                label="[5] 시설·환경의 편의성"
                value={values.starpoint5}
                onChange={(value) => handleChange("starpoint5", value)}
                onRatingSelect={handleRatingSelect}
              />
            </div>
          </div>
          <input
            type="text"
            name="tag1"
            style={{ display: "none" }}
            value={tag1}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="tag2"
            style={{ display: "none" }}
            value={tag2}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="tag3"
            style={{ display: "none" }}
            value={tag3}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="serial"
            style={{ display: "none" }}
            value={postId}
            onChange={handleInputChange}
          />
          <div>* 리뷰 작성 하기</div>
          <StyledDiv>
            <StyledTextarea
              style={{ marginTop: "16px" }}
              minRows={4}
              placeholder="* 학원에 대한 자세한 후기를 남겨주세요."
              name="body"
              value={values.body}
              onChange={handleInputChange}
            />
          </StyledDiv>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <StyledDiv>
              <Button
                onClick={() => {
                  handleCancel();
                }}
                fullWidth
                disabled={isSubmitting}
                sx={{
                  mt: "2rem",
                  mb: "2rem",
                  color: "#0074e4",
                  fontSize: "15px",
                  width: "auto",
                }}
              >
                🡰 취소하기
              </Button>
            </StyledDiv>

            <div style={{ textAlign: "right" }}>
              <Button
                fullWidth
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                className="button"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundImage:
                    "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
                  color: "white",
                  fontSize: "15px",
                  width: "auto",
                }}
                onClick={async (event) => {
                  event.preventDefault();
                  await handleSubmit(event);
                  handleCancel();
                }}
              >
                제출하기
              </Button>
            </div>
          </div>
          {submittingError?.message && (
            <div style={{ textAlign: "center" }}>{submittingError.message}</div>
          )}
          <div
            style={{
              backgroundColor: "#dff1f9",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "5px",
              color: "gray",
            }}
          >
            <p>
              • 본 후기는 학뷰 운영팀의 검수를 거쳐 게시됩니다. 다른
              사용자들에게 도움이 되는 후기를 작성했는지 충분히 검토 후
              제출해주세요.
            </p>
            <p>
              • 검수 과정에서 허위, 조작, 비방, 욕설, 무의미한 내용 등으로
              작성된 후기는 반려처리되며, 검수 과정을 방해할 목적으로 판단되는
              악의적인 작성자에 대해서는 사안에 따라 오늘학교 운영팀에서 계정
              정지 또는 영업방해, 명예훼손 등의 건으로 법적인 조치를 취할 수
              있습니다.
            </p>
          </div>
        </StyledForm>
      </div>
    </>
  );
}
