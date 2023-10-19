import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { ac_user_api } from "../../Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
};

function DeleteAccount({ onConfirm, password }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  // 확인 버튼 클릭 시 처리
  const handleConfirmClose = () => {
    ac_user_api.delete(password)
      .then((response) => {
        // 비밀번호가 일치하면 실행
        alert("계정이 탈퇴되었습니다.. 이용해주셔서 감사합니다.");
        localStorage.removeItem('login-token');
        localStorage.removeItem('refreshToken');
        setOpen(false);
        onConfirm();
        navigate("/");
      })
      .catch((error) => {
        // 에러가 발생하면 실행
        console.error("계정 삭제 중 오류 발생: ", error);
        alert("비밀번호가 일치하지 않습니다.");
      })
  };

  // 취소 버튼 클릭 시 처리
  const handleCancelClose = () => {
    setOpen(false);
    onConfirm();
  };
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>확인</Button>
      <Modal
        open={open}
        onClose={handleCancelClose} // 모달 외부 클릭 시 닫히는 동작 변경
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            height: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 id="child-modal-title">정말 탈퇴하시겠습니까?</h2>
          <p id="child-modal-description">
            확인 버튼을 누르시면 탈퇴가 완료 됩니다.
          </p>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* 확인버튼에는 홈으로 이동하는 handleClose 적용 */}
            <Button onClick={handleConfirmClose}>확인</Button>
            {/* 취소버튼에는 그냥 모달만 닫히게 변경 */}
            <Button onClick={handleCancelClose}>취소</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [password, setPassword] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* 회원 탈퇴 버튼 */}
      <Button onClick={handleOpen}>회원 탈퇴</Button>

      {/* 본인 확인 모달 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        {/* 모달 내부 컨텐츠 */}
        <Box
          sx={{
            ...style,
            width: 500,
            height: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 본인 확인 문구 */}
          <h2 id="parent-modal-title">회원 탈퇴전 본인 확인</h2>

          {/* 비밀번호 입력 필드와 확인 버튼을 한 줄로 만들기 위해 추가적인 Box 컴포넌트 사용 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* 비밀번호 입력 필드 */}
            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* 비밀번호 확인 버튼 클릭 시 비밀번호 검사 후 DeleteAccount 모달 열기 */}
            {/* <Button
              onClick={() => {
                if (password === correctPassword) {
                  handleOpen();
                } else {
                  alert("비밀번호가 일치하지 않습니다.");
                }
              }}
              sx={{ mb: 5 }}
            >
              비밀번호 확인
            </Button> */}
          </Box>

          {/* 탈퇴 확인 모달 */}
          <DeleteAccount
            onConfirm={() => {
              setPassword("");
              handleClose();
            }}
            password={password}
          />
        </Box>
      </Modal>
    </div>
  );
}
