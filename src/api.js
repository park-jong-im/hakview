const BASE_URL = "http://localhost:8080/api";

export async function getReview({ order = "date", offset = 0, limit = 6 }) {
  //throw new Error("버그가 아니라 기능입니다......")
  const query = `order=${order}&offset=${offset}&limit=${limit}`;

  const response = await fetch(`${BASE_URL}/news?${query}`);
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다......");
  }

  const body = await response.json();
  return body;
}

export async function createReview(formData) {
  const response = await fetch(`${BASE_URL}/news`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 생성하는데 실패했습니다......");
  }

  const body = await response.json();
  return body;
}

export async function updateReview(aid, formData) {
  const response = await fetch(`${BASE_URL}/news/${aid}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 수정하는데 실패했습니다......");
  }

  const body = await response.json();
  return body;
}

export async function deleteReview(aid) {
  try {
    const response = await fetch(`${BASE_URL}/news/del/${aid}`, {
      method: "POST",
    });

    if (!response.ok) {
      // Log the response for debugging purposes
      console.error("DELETE Request Failed. Response:", response);
      throw new Error("리뷰를 삭제하는데 실패했습니다......");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    // Log any exceptions that occur during the request
    console.error("An error occurred during the DELETE request:", error);
    throw error;
  }
}

export async function likeClick(aid, likeStatus) {
  try {
    const response = await fetch(`${BASE_URL}/news/like/${aid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likeStatus }),
    });

    if (!response.ok) {
      console.error("Like Request Failed. Response:", response);
      throw new Error("Failed to like news...");
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("An error occurred during the like request:", error);
    throw error;
  }
}

export async function getLikeClick(aid) {
  try {
    const response = await fetch(`${BASE_URL}/news/${aid}`);
    if (!response.ok) {
      console.error("Like Click Request Failed. Response:", response);
      throw new Error("Failed to get like click...");
    }

    const data = await response.json();
    return data.likeClick; // 가져온 likeClick 값을 반환
  } catch (error) {
    console.error("An error occurred during the like click request:", error);
    throw error;
  }
}

//NoticeBoard부분
