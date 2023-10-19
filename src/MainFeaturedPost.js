import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import img1 from "../src/img/img1.png";

function MainFeaturedPost(props) {
  const { post } = props;

  return (
    <Paper
      sx={{
        position: "relative",
        color: "#fff",
        mb: 4,
        height: "400px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${img1})`,
      }}
    >

      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >

            <Button
              variant="subtitle1"
              href="/reviewsearchmain"
              type="submit"
              sx={{
                mt: 10,
                mb: 10,
                py: "5px",
                fontSize: "1.2rem",
                position: "absolute",
                top: "300px",
                center: "50%",
                fontWeight: 800,
                maxWidth: "800px",
                margin: 0,
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
                color: "white",
                backgroundColor: "#8f1ddf",

                "&:hover": {
                  cursor: "pointer",
                  transform: "scale(1.04)",
                  transition: "all 0.3s ease",
                  zIndex: 3,
                  boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#440d8c",
                },
              }}
            >
              {post.buttonText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;
