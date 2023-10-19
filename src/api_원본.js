import axios from "axios";

const BASE_URL = "http://localhost:8080/";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfQUNBRE1JTiIsImV4cCI6MTY5Njc1MDM3Mn0.0XmIyhRjziRqT7wB-FZf6MiG5sFlr0VD3O0M3fwu2PHLUrqINE5YY5HAcq5hBp4Axlol65OWgM6lJyEDXClTEw"; // 로컬 스토리지에서 토큰을 가져옵니다

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`, // 헤더에 토큰을 포함합니다
  },
});

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

// 세민 작성
export const freeboard_api = {
  // 자게 리스트
  list: async (page) => {
    const response = await axios.get(`${BASE_URL}freeboard/page?page=${page}`);
    const freeboard_list = response.data;
    return freeboard_list;
  },

  // 자게 상세 페이지
  one: async (serial) => {
    const response = await axios.get(
      `${BASE_URL}freeboard/one?serial=${serial}`
    );
    const freeboard_one = response.data;
    return freeboard_one;
  },

  write: async (title, body) => {
    console.log(axiosInstance);
    console.log(token);
    await axiosInstance.post("/freeboard/", {
      title: title,
      body: body,
    });
  },
};
