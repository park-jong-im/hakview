import React from 'react';
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
    fontSize: "35px"
  },

  "& .MuiRating-iconFilled .MuiSvgIcon-root": {
    fontSize: "35px" // 선택된 아이콘 크기 조정 (선택 전과 동일한 크기로 설정)
  }
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied"
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied"
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral"
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied"
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied"
  }
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired
};

export default function ReviewFormRating({ name, value, onChange, onRatingSelect }) {
  const handleRatingChange = (newValue) => {
    onChange(newValue);
    onRatingSelect(name, newValue); // Notify the parent component of the selected rating
  };

  return (
    <StyledRating
      name={name}
      value={value}
      onChange={(event, newValue) => handleRatingChange(newValue)}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}