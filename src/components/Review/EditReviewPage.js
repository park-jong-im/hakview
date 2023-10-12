import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewWrite from '../ReviewWriteForm/ReviewWrite';

function EditReviewPage() {
  const { id } = useParams(); // URL 매개변수에서 id 값을 가져옵니다.
  
  const [selectedItem, setSelectedItem] = useState(null); // 상태 추가

  useEffect(() => {
    async function fetchSelectedItem() {
      const response = await fetch(`/api/reviews/${id}`);
      const data = await response.json();
      setSelectedItem(data);
    }

    fetchSelectedItem();
  }, [id]);

  if (!selectedItem) return null; // 아이템이 로드되지 않았으면 아무것도 렌더링하지 않음

  const handleSubmit = async (formData) => {
    // TODO: formData를 사용하여 서버에 PUT 요청 보내기
    // 요청이 성공하면 응답에서 리뷰 데이터 추출 후 반환
  };

  return (
    <div>
      <h2>리뷰 수정하기</h2>
      <ReviewWrite onSubmit={handleSubmit} initialValues={selectedItem} />
    </div>
  );
}

export default EditReviewPage;
