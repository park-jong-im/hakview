import axios from "axios";

const Base_URL = "http://localhost:8080/";

const token = localStorage.getItem('login-token'); // 로컬 스토리지에서 토큰을 가져옵니다

const axiosInstance = axios.create({
  baseURL: Base_URL,
  headers: {
    'Authorization': `Bearer ${token}`, // 헤더에 토큰을 포함합니다
  },
});

// 회원가입 및 로그인 관련 api
export const auth_api = {
  // 로그인
  login: async (inputId, inputPw) => {
    const response = await axios.post(`${Base_URL}auth/login`, {
      id: inputId,
      password: inputPw
    });
    alert('로그인 성공!!!');

    // 로그인 토큰을 localStorage에 저장합니다.
    localStorage.setItem('login-token', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    // 페이지를 이동합니다.
    window.location.href = '/';
  },

  // 학원 회원가입
  signup: async (id, name, password, phone, birth, academyName, address, academyPhone) => {
    await axios.post(`${Base_URL}auth/signup`, {
      id: id,
      nickname: name,
      password: password,
      birth: birth,
      phone: phone,
      ac_name: academyName,
      ac_address: address,
      ac_phone: academyPhone
    })

    window.location.href = '/login'
  },

  // 일반 회원가입
  user_signup: async (id, name, password, phone, birth) => {
    await axios.post(`${Base_URL}auth/signup`, {
      id: id,
      nickname: name,
      password: password,
      birth: birth,
      phone: phone
    })

    window.location.href = '/login'
  },

  // 아이디 찾기
  finduserid: async (phone, birth) => {
    const response = await axios.get(`${Base_URL}auth/findUserId?phone=${phone}&birth=${birth}`);
    const finduserid = response.data;
    return finduserid;
  },

  // 비번 찾기
  findpw: async (id, birth, phone) => {
    const response = await axios.post(`${Base_URL}auth/findpw`, {
      id: id,
      phone: phone,
      birth: birth
    })

    return response;
  },

  // 비번 수정
  changepw: async (id, expw1, expw2) => {
    await axios.post(`${Base_URL}auth/changepw`, {
      id: id,
      exPassword: expw1,
      newPassword: expw2
    })
  }


};

// 유저 정보 api
export const ac_user_api = {
  // 내정보
  me: async () => {
    const response = await axiosInstance.get(`${Base_URL}ac_user/me`)
    const ac_user_data = response.data;
    return ac_user_data;
  },

  // 유저정보수정
  updateInfo: async (id, name, password, phone, birth, academyName, address, academyPhone) => {
    await axiosInstance.post(`${Base_URL}ac_user/updateInfo`, {
      id: id,
      nickname: name,
      password: password,
      birth: birth,
      phone: phone,
      ac_name: academyName,
      ac_address: address,
      ac_phone: academyPhone
    })
    window.location.href = '/mypage';
  },

  // 유저정보삭제
  delete: async (password) => {
    const response = await axiosInstance.delete(`${Base_URL}ac_user/delete?password=${password}`)
    return response.data;
  }
};

// 학원 정보글 api
export const article_api = {
  // 학원 리스트 페이지
  page: async (page) => {
    const response = await axios.get(`${Base_URL}article/page?page=${page}`)
    const article_list = response.data;
    return article_list;
  },

  // 학원 상세정보
  one: async (serial) => {
    const response = await axios.get(`${Base_URL}article/one?serial=${serial}`)
    const article_data = response.data;
    return article_data;
  },

  // 학원 정보글 작성
  createArticle: async (ac_name, ac_address, ac_phone, title, content, tag1, tag2, tag3) => {
    await axiosInstance.post(`${Base_URL}article/`, {
      title: title,
      body: content,
      tag1: tag1,
      tag2: tag2,
      tag3: tag3,
      ac_name: ac_name,
      ac_address: ac_address,
      ac_phone: ac_phone
    })
  },

  search: async (keyword, currentPage) => {
    const response = await axios.get(`${Base_URL}article/search?keyword=${keyword}&page=${currentPage}`);
    const article_search = response.data;
    return article_search;
  },

  searchtag1: async (tag1) => {
    console.log(tag1)
    const response = await axios.get(`${Base_URL}article/tag1?tag1=${tag1}`);
    console.log("콘솔쨩" + response.data);
    const article_tag1 = response.data;
    return article_tag1;
  },

  searchtag2: async (tag2) => {
    const response = await axios.get(`${Base_URL}article/tag2?tag2=${tag2}`);
    const article_tag2 = response.data;
    return article_tag2;
  },

  searchtag3: async (tag3) => {
    const response = await axios.get(`${Base_URL}article/tag3?tag3=${tag3}`);
    const article_tag3 = response.data;
    return article_tag3;
  }


}

// 리뷰 리스트
export const review_api = {
  // 리뷰 리스트
  list: async (page) => {
    const response = await axios.get(`${Base_URL}review/page?page=${page}`)
    const review_list = response.data;
    return review_list;
  },

  // 리뷰 상세 페이지
  one: async (serial) => {
    const response = await axios.get(`${Base_URL}review/one?serial=${serial}`)
    const review_one = response.data;
    return review_one;
  },

  write: async (formData) => {
    await axiosInstance.post(`${Base_URL}review/`, formData);
  },

  // 리뷰 검색
  search: async (keyword, currentPage) => {
    const response = await axios.get(`${Base_URL}review/search?keyword=${keyword}&page=${currentPage}`);
    const review_search = response.data;
    return review_search;
  },

  acreview1: async (serial) => {
    const response = await axios.get(`${Base_URL}review/list?reviewserial=${serial}`)
    const acreview_search = response.data;
    return acreview_search;
  },

  acreview2: async (serial) => {
    const response = await axios.get(`${Base_URL}review/list?reviewserial=${serial}`)
    const acreview_search = response.data;
    return acreview_search;
  }
}


// 자유 게시판
export const freeboard_api = {
  // 자게 리스트
  list: async (page) => {
    const response = await axios.get(`${Base_URL}freeboard/page?page=${page}`)
    const freeboard_list = response.data;
    return freeboard_list;
  },

  // 자게 상세 페이지
  one: async (serial) => {
    const response = await axios.get(`${Base_URL}freeboard/one?serial=${serial}`)
    const freeboard_one = response.data;
    return freeboard_one;
  },

  write: async (title, body) => {
    await axiosInstance.post('/freeboard/', {
      title: title,
      body: body
    });
  }
}