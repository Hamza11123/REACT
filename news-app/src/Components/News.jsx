// import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import React, { useContext, useEffect, useState } from "react";
import NewsItem from "./NewsItem";

import Context from "../Context/Context";
import { Button } from "@mui/material";
import Loader from "./Loader";

import CircularIndeterminate from "./CircularIndeterminate";
import LinearIndeterminate from "./LinearIndeterminate";

const News = (props) => {
  const {
    fetchData,
    Articles,
    setPageSize,
    PageSize,
    setPageNumber,
    PageNumber,
    Loading,
    setCategory,
    Category,
  } = useContext(Context); // importing [State-Variables] Through Context-Api

  useEffect(() => {
    setCategory(props.category);
    fetchData(false);
  }, [PageNumber]);

  useEffect(() => {
    fetchData(true);
  }, [Category]);

  const handlePreviousClick = () => {
    setPageNumber(() => PageNumber - 1);
    console.log("Next btn clicked", PageNumber);
  };

  const handleNextClick = () => {
    setPageNumber(() => PageNumber + 1);
    console.log("Next btn clicked", PageNumber);
  };

  return (
    <>
      {/* flex-Cards-Container  */}

      <Box sx={{ maxWidth: "80rem", m: "auto" }}>
        {Loading && <LinearIndeterminate />}
      </Box>
      <Box
        sx={{
          maxWidth: "80rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          m: "auto",
          p: 2,
        }}
      >
        {Articles &&
          Articles.articles.map((article, ind) => (
            <Box key={ind}>
              <NewsItem
                title={article.title}
                description={article.description}
                urlToImage={article.urlToImage}
                url={article.url}
              />
            </Box>
          ))}

        {/* Flex-Button-Container  */}
        {Articles && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              mb: "4",
              justifyContent: "center",
            }}
          >
            {/* <Button
              onClick={handlePreviousClick}
              variant={"contained"}
              sx={{ pt: 1.6 }}
              size="large"
              disabled={!(PageNumber >= 2)}
            >
              Previous
            </Button> */}

            {Loading ? (
              <CircularIndeterminate />
            ) : (
              // Disabled-Button Wala Logic Yahan Kaam Aaagya.. Condition k false hony par.. Button Component ko Render hee Mat Karo.. that's it..!
              PageNumber < Math.ceil(Articles.totalResults / PageSize) && (
                <Button
                  onClick={handleNextClick}
                  variant="contained"
                  sx={{ pt: 1.6 }}
                  size="large"
                  disabled={
                    !(PageNumber < Math.ceil(Articles.totalResults / PageSize))
                  }
                >
                  Load More
                </Button>
              )
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default News;
