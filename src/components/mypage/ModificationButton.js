import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import UserProfile from "./UserProfile";
import AcProfile from "./AcProfile";

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AcProfile />;
    case 1:
      return <AcProfile />;
    default:
      throw new Error("Unknown step");
  }
}

//  // 회원가입 버튼 클릭 시 실행되는 함수
//  const handleNext = async () => {
//   try {
//     // 엑시오스로 서버에 회원가입 요청 보내기
//     if (
//       isName &&
//       isId &&
//       isPassword &&
//       isPasswordConfirm &&
//       isPhone &&
//       isBirth
//     ) {
//       const response = await axios
//         .post("http://localhost:8080/auth/modify", {
//           id: id,
//           name: name,
//           password: password,
//           passwordConfirm: passwordConfirm,
//           phone: phone,
//           birth: birth,
//         })
//         .then((response) => {
//           alert(
//             "서버에 보내고 서버가 다시 보낸 데이터\n" +
//               JSON.stringify(response.data)
//           );
//         })
//         .catch(() => {
//           console.log("aaa");
//         });

//       // 서버 응답 처리
//       if (response.status === 201) {
//         alert("저장 되었습니다.");
//       } else {
//         alert("수정 실패: 서버 오류");
//       }
//     }
//   } catch (error) {
//     console.error("수정 오류:", error);
//   }
// };

export default function ModificationButton() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                돌아가기
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                mt: 3,
                ml: 1,
                backgroundImage:
                  "linear-gradient(45deg, #9370DB 30%, #0288d1 90%)",
              }}
              top={null}
            >
              저장하기
            </Button>
          </Box>
        </React.Fragment>
      </Container>
    </React.Fragment>
  );
}
