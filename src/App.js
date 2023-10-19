import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReviewWrite from "./components/ReviewWriteForm/ReviewWrite";
import NoticeBoardMain from "../src/components/NoticeBoard/NoticeBoardMain";
import NoticeBoardWrite from "../src/components/NoticeBoard/NoticeBoardWrite";
import NoticeBoardForm from "./components/NoticeBoard/NoticeBoardForm";
import ReviewSearchMain from "./components/ReviewSearch/ReviewSearchMain";
import AcaReviewInfo from "./components/AcaReviewInfo/AcaReviewInfo";
import MypageMain from "./components/mypage/MypageMain";
import ReviewWriteForm from "./components/ReviewWriteForm/ReviewWriteForm";
import MyLikeList from "./components/mypage/MyLikeList";
import AcademyJoinForm from "./components/joinForm/AcademyJoinForm";
import JoinInitiationForm from "./components/joinForm/JoinInitiationForm";
import UserJoinForm from "./components/joinForm/UserJoinForm";
import Main from "./components/home/Main";
import Login from "./components/Login/Login";
import AcModification from "./components/mypage/AcModification";
import AcaInfo from "./components/AcaInfo/AcaInfo";
import AcaWriteForm from "./components/WriteForm/AcaWriteForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/reviewwrite" element={<ReviewWrite />} />
        <Route path="/reviewwriteform/:postId" element={<ReviewWriteForm />} />
        <Route path="/noticeboardmain" element={<NoticeBoardMain />} />
        <Route path="/noticeboardwrite" element={<NoticeBoardWrite />} />
        <Route path="/noticeboardform/:postId" element={<NoticeBoardForm />} />
        <Route path="/reviewsearchmain" element={<ReviewSearchMain />} />
        <Route path="/acareviewinfo/:postId" element={<AcaReviewInfo />} />
        <Route path="/mypage" element={<MypageMain />} />
        <Route path="/mylikelist" element={<MyLikeList />} />
        <Route path="/join" element={<JoinInitiationForm />} />
        <Route path="/user" element={<UserJoinForm />} />
        <Route path="/academy" element={<AcademyJoinForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MypageMain />} />
        <Route path="/modify" element={<AcModification />} />
        <Route path="/acaWriteform" element={<AcaWriteForm />} />
        <Route path="/acainfo" element={<AcaInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
