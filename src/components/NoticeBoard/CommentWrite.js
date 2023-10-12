import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const INITIAL_VALUES = {
  content: "",
};

const StyledForm = styled("form")`
  max-width: 900px;
  margin: 0 auto;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 30px;
  background-color: #e8eaf6;
`;

const StyledDiv = styled("div")`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 850px;
`;

const StyledTextarea = styled(TextareaAutosize)`
  width: 700px;
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

export default function CommentWrite({
  initialValues = INITIAL_VALUES,
  onCancel,
  onSubmit,
  onSubmitSuccess,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

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
      window.location.reload();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", values.content);

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
        <StyledForm className="ReviewForm" onSubmit={handleSubmit}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src="/broken-image.jpg" sx={{ width: 30, height: 30 }} />
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>곰곰이</div>
          </Stack>
          <StyledDiv>
            <StyledTextarea
              style={{ marginTop: "16px", marginRight: "15px" }}
              minRows={3}
              placeholder="* 주제와 무관한 댓글, 악플은 삭제 될 수 있습니다."
              name="content"
              value={values.content}
              onChange={handleInputChange}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ textAlign: "right" }}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
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
                  등록
                </Button>
              </div>
            </div>
          </StyledDiv>
        </StyledForm>
      </div>
    </>
  );
}
