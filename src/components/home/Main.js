import * as React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MainFeaturedPost from "../../MainFeaturedPost";
import Grid from "@mui/material/Grid";
import Header from "../../Header";
import Footer from "../../Footer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MainSearchBar from "../../MainSearchBar";
import Box from "@mui/material/Box";
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Container from "@mui/material/Container";

import { article_api, review_api } from "../../Api";


const mainFeaturedPost = {
  imageText: "main image description",
  buttonText: "리뷰 보러가기",
};

const NumberBox = styled(Box)`
  background-color: cornflowerblue;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  display: inline-block;
  font-weight: bold;
  margin-right: 10px;
`;

export default function MainForm() {
  const [aitem, setAitem] = useState([]);
  const [ritem, setRitme] = useState([]);

  // 학원 정보 불러옴
  async function fetchData1() {
    const articleList = await article_api.search("", 1);
    console.log(articleList)
    const formattedData = articleList.content.map(item => ({
      articleSerial: item.articleSerial,
      ac_name: item.ac_name,
      articleTitle: item.articleTitle,
      address: item.ac_address
    }));
    setAitem(formattedData)

    console.log(aitem)
  }



  // 리뷰 정보 불러옴
  async function fetchData2() {
    const reviewList = await review_api.list(1);
    const formattedData = reviewList.content.map(item => ({
      serial: item.reviewSerial,
      title: item.reviewTitle,
      ac_name: item.ac_name,
      article_id: item.article_id
    }));
    setRitme(formattedData)
    console.log(reviewList)
    console.log(ritem)
  }

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  return (
    <Container maxWidth="lg">
      <Header />
      <main>
        <MainFeaturedPost
          post={mainFeaturedPost}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MainSearchBar />
        </div>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            {/* 학원정보 최신순 시작 */}
            <List
              sx={{
                width: "100%",
                maxWidth: 700,
                border: "1px solid #ccc", // 테두리 스타일 추가
                borderRadius: "8px", // 선택적으로 border-radius 추가
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 630,
                "& ul": {
                  padding: 0,
                  listStyleType: "none",
                },
              }}
              subheader={
                <li style={{ marginTop: "20px" }}>
                  <ul>
                    <ListSubheader
                      sx={{
                        fontSize: "1.5rem",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      학원정보{" "}
                      <span style={{ color: "orangered" }}>최신순</span>
                    </ListSubheader>
                    {aitem.map((item) => (
                      <React.Fragment key={item.articleSerial}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar>
                              <SchoolRoundedIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <Link to={`/acareviewinfo/${item.articleSerial}`} style={{ textDecoration: "none" }}>
                            <ListItemText
                              // primary={`Item ${item}`}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                  </Typography>
                                  [{item.ac_name} 학원] {item.articleTitle}<br />
                                  {item.address}
                                </React.Fragment>
                              }
                            />
                          </Link>
                        </ListItem>

                        {item !== 10 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </li>
              }
            />
            {/*  학원정보 최신순 끝 */}
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* 리뷰 순위  list */}
            <List
              sx={{
                width: "100%",
                maxWidth: 700,
                border: "1px solid #ccc", // 테두리 스타일 추가
                borderRadius: "8px", // 선택적으로 border-radius 추가
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 700,
                "& ul": {
                  padding: 0,
                  listStyleType: "none",
                },
              }}
              subheader={
                <li style={{ marginTop: "20px" }}>
                  <ul>
                    <ListSubheader
                      sx={{
                        fontSize: "1.5rem",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      리뷰 <span style={{ color: "dodgerblue" }}>순위</span>
                    </ListSubheader>
                    {ritem.map((item, index) => (
                      <React.Fragment key={item.serial}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            //  primary={`Item ${item}`}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                ></Typography>
                                <React.Fragment>
                                  <NumberBox>{index + 1}</NumberBox>
                                  <Link to={`/acareviewinfo/${item.article_id}`} style={{ textDecoration: "none" }}>
                                    <span style={{ marginLeft: "10px", color: "gray" }}>
                                      [{item.ac_name} 학원] {item.title}
                                    </span>
                                  </Link>
                                </React.Fragment>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        {item !== 10 && (
                          <Divider variant="middle" component="li" />
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </li>
              }
            />
            {/* End 리뷰 list */}
          </Grid>
        </Grid>
      </main>
      <Footer />
    </Container>

  );
}
