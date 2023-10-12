import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";
import ReviewFormRating from "./ReviewFormRating";

const INITIAL_VALUES = {
  title: "",
  teachRating: 0,
  curriclmRating: 0,
  serviceRating: 0,
  convRating: 0,
  costRating: 0,
  content: "",
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
  onSubmit,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  // 기존 값을 사용하여 selectedRatings 초기화
  const [selectedRatings, setSelectedRatings] = useState({
    teachRating: initialValues.teachRating,
    curriclmRating: initialValues.curriclmRating,
    serviceRating: initialValues.serviceRating,
    convRating: initialValues.convRating,
    costRating: initialValues.costRating,
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
      navigate("/AcaReviewInfo?tab=2");
      window.location.reload();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    formData.append("teachRating", selectedRatings.teachRating);
    formData.append("curriclmRating", selectedRatings.curriclmRating);
    formData.append("serviceRating", selectedRatings.serviceRating);
    formData.append("convRating", selectedRatings.convRating);
    formData.append("costRating", selectedRatings.costRating);
    console.log(values);

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
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
              defaultValue="잘나가는 학원"
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
              defaultValue="고등연합2"
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
                name="teachRating"
                label="[1] 강사진의 강의력"
                value={values.teachRating}
                onChange={(value) => handleChange("teachRating", value)}
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
                name="curriclmRating"
                label="[2] 커리큘럼·교재의 우수성"
                value={values.curriclmRating}
                onChange={(value) => handleChange("curriclmRating", value)}
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
                name="serviceRating"
                label="[3] 상담·의사소통의 원할함"
                value={values.serviceRating}
                onChange={(value) => handleChange("serviceRating", value)}
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
                name="convRating"
                label="[4] 학사·행정관리의 체계성"
                value={values.convRating}
                onChange={(value) => handleChange("convRating", value)}
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
                name="costRating"
                label="[5] 시설·환경의 편의성"
                value={values.costRating}
                onChange={(value) => handleChange("costRating", value)}
                onRatingSelect={handleRatingSelect}
              />
            </div>
          </div>
          <div>* 리뷰 작성 하기</div>
          <StyledDiv>
            <StyledTextarea
              style={{ marginTop: "16px" }}
              minRows={4}
              placeholder="* 학원에 대한 자세한 후기를 남겨주세요."
              name="content"
              value={values.content}
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
