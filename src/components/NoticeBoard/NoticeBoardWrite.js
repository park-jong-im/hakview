// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import { styled } from "@mui/system";
// import Footer from "../../Footer";
// import Header from "../../Header";
// import { freeboard_api } from "../../api";

// const INITIAL_VALUES = {
//   title: "",
//   body: "",
// };

// const StyledForm = styled("form")`
//   max-width: 500px;
//   margin: 0 auto;
//   font-size: 14px;
//   font-weight: bold;
// `;

// const StyledDiv = styled("div")`
//   display: flex;
//   justify-content: center;
// `;

// const StyledTextarea = styled(TextareaAutosize)`
//   width: 100%;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   padding: 8px;
//   outline: none;
//   transition: border-color 0.3s ease-in-out;

//   &:focus {
//     border-color: #2196f3;
//   }
// `;

// export default function NoticBoardWrite({
//   initialValues = INITIAL_VALUES,
//   onCancel,
//   onSubmit,
//   onSubmitSuccess,
// }) {
//   const [values, setValues] = useState(initialValues);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submittingError, setSubmittingError] = useState(null);

//   const navigate = useNavigate();

//   const handleChange = (name, value) => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleCancel = () => {
//     if (onCancel) {
//       onCancel();
//     } else {
//       navigate("/NoticeBoardMain");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     handleChange(name, value);
//   };

//   const handleSubmit = async () => {
//     // e.preventDefault();
//     // const formData = new FormData();
//     // formData.append("title", values.title);
//     // formData.append("content", values.content);
//     // console.log(values);
//     // let result;

//     // try {
//     //   setSubmittingError(null);
//     //   setIsSubmitting(true);
//     //   result = await onSubmit(formData);
//     // } catch (error) {
//     //   setSubmittingError(error);
//     //   return;
//     // } finally {
//     //   setIsSubmitting(false);
//     // }

//     // const { review } = result;
//     // setValues(INITIAL_VALUES);
//     // onSubmitSuccess(review);
//     await freeboard_api.write(values.title, values.body);
//   };

//   return (
//     <>
//       <Header />
//       <div>
//         <div style={{ marginTop: "40px" }}>
//           <h2 style={{ textAlign: "center" }}>자유게시판 글쓰기</h2>
//         </div>

//         <StyledForm className="ReviewForm" onSubmit={handleSubmit}>
//           <div style={{ marginTop: "40px" }}>* 제 목</div>
//           <div style={{ marginBottom: "40px" }}>
//             <TextField
//               margin="normal"
//               name="title"
//               label="제목을 입력하세요"
//               required
//               variant="outlined"
//               value={values.title}
//               onChange={handleInputChange}
//               multiline
//               style={{ width: "100%" }}
//             />
//           </div>

//           <div>* 글 작성 하기</div>

//           <StyledDiv>
//             <StyledTextarea
//               style={{ marginTop: "16px" }}
//               minRows={8}
//               placeholder="* 내용을 입력하세요"
//               name="body"
//               value={values.body}
//               onChange={handleInputChange}
//             />
//           </StyledDiv>

//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <StyledDiv>
//               <Button
//                 onClick={() => {
//                   handleCancel();
//                 }}
//                 fullWidth
//                 disabled={isSubmitting}
//                 sx={{
//                   mt: "2rem",
//                   mb: "2rem",
//                   color: "#0074e4",
//                   fontSize: "15px",
//                   width: "auto",
//                 }}
//               >
//                 🡰 취소하기
//               </Button>
//             </StyledDiv>

//             <div style={{ textAlign: "right" }}>
//               <Button
//                 fullWidth
//                 disabled={isSubmitting}
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 className="button"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   backgroundImage:
//                     "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
//                   color: "white",
//                   fontSize: "15px",
//                   width: "auto",
//                 }}
//                 onClick={async (event) => {
//                   event.preventDefault();
//                   await handleSubmit(event);
//                   handleCancel();
//                 }}
//               >
//                 글 등 록
//               </Button>
//             </div>
//           </div>

//           {submittingError?.message && (
//             <div style={{ textAlign: "center" }}>{submittingError.message}</div>
//           )}
//           <div
//             style={{
//               backgroundColor: "#dff1f9",
//               borderRadius: "4px",
//               padding: "10px",
//               fontSize: "7px",
//               color: "gray",
//             }}
//           >
//             <p>
//               • 검수 과정에서 허위, 조작, 비방, 욕설, 무의미한 내용 등으로
//               작성된 글은 반려처리되며, 검수 과정을 방해할 목적으로 판단되는
//               악의적인 작성자에 대해서는 사안에 따라 오늘학교 운영팀에서 계정
//               정지 또는 영업방해, 명예훼손 등의 건으로 법적인 조치를 취할 수
//               있습니다.
//             </p>
//           </div>
//         </StyledForm>
//       </div>
//       <Footer />
//     </>
//   );
// }
