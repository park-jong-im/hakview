import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Color = styled("div")`
  color: rgba(255, 255, 255, 0.65);
  font-size: 20px;
`;

const InputWrapper = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  width: 700px;
  border: 1px solid #d9d9d9;
  background: linear-gradient(
    45deg,
    rgba(147, 112, 219, 0.8) 40%,
    rgba(2, 136, 209, 0.8) 80%
  );
  border-radius: 50px;
  padding: 1px;
  justify-content: end;
  &:hover {
    border-color: #40a9ff;
  }
  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  & input {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.85);
    height: 30px;
    width: 520px;
    box-sizing: border-box;
    padding: 20px 16px;
    border: 0;
    margin: 0;
    outline: 0;
    border-radius: 5px;
    flex-grow: 0;
  }
`;

const SelectWrapper = styled("div")`
  top: 1px;
  border-radius: 4px;
  z-index: 1;
  & select {
    color: white;
  }
  & option {
    color: black;
  }
`;

const Container = styled("div")`
  margin-bottom: 30px;
  padding-bottom: 30px;
`;

const NativeSelectStyled = styled(NativeSelect)`
  width: auto; /* 글씨가 다 보이도록 자동으로 너비 설정 */
  white-space: nowrap; /* 글자가 줄 바꿈되지 않도록 설정 */
  overflow: visible; /* 오버플로우 허용 */
  text-overflow: unset; /* 텍스트 오버플로우 스타일을 초기값으로 설정 */
  color: #ffffff;
  && {
    &::before {
      border-bottom: 2px solid #410c87; /* 밑줄 원하는 색상으로 변경 */
    }

    &::after {
      border-bottom: 2px solid #410c87; /* 밑줄 원하는 색상으로 변경 */
    }
    &:hover::before {
      border-bottom: 2px solid #410c87; /* 마우스 호버 시 색상 */
    }
  }
`;
const selectStyle = {
  "& .MuiNativeSelect-icon": {
    color: "white", // 옵션 화살표 색상으로 변경
  },
};

const MainSearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (category, search) => {
    if (category === "all") {
      navigate("/acainfo", { state: { search } });
    } else if (category === "review") {
      navigate("/reviewsearchmain", { state: { search } });
    }
  };

  const handleSearchClick = () => {
    const selectedCategory = document.querySelector("select").value;
    handleSearch(selectedCategory, searchText); // 검색어를 함께 전달
  };

  return (
    <Container>
      <Color>텍스트 색상 및 폰트 크기 설정</Color>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <InputWrapper className={isFocused ? "focused" : ""}>
          <SelectWrapper sx={{ m: 1, minWidth: "auto" }}>
            <NativeSelectStyled
              defaultValue={"none"}
              inputProps={{
                name: "category",
                id: "uncontrolled-native",
              }}
              sx={selectStyle}
            >
              <option value={"all"}>학원정보</option>
              <option value={"review"}>리뷰</option>
            </NativeSelectStyled>
          </SelectWrapper>
          <input
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchText} // 입력된 검색어를 상태에 바인딩
            onChange={(e) => setSearchText(e.target.value)} // 검색어가 변경될 때 업데이트
          />

          <IconButton
            type="submit"
            sx={{ p: "10px", color: "white" }}
            aria-label="search"
            onClick={handleSearchClick}
          >
            <SearchIcon />
          </IconButton>
        </InputWrapper>
      </Box>
    </Container>
  );
};

export default MainSearchBar;
