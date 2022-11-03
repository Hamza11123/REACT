import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import VideosBox from "./VideosBox";
import Context from "../Context/Context";
const Search = () => {
  const { Videos, setVideos, SelectedCategory, setSelectedCategory } =
    useContext(Context);

  return (
    <Stack
      id="Feed"
      sx={{
        flexDirection: { lg: "row", xs: "column" },
        bgcolor: { xs: "#312d2d" },
        color: "#fff",
      }}
    >
      {/*       * Side-Bar       */}

      {/*       ? Hey, Tell Me.. Should I Show [Side-Bar] In The [Search-Component] Or Not?        */}

      {/* <SideBar
        SelectedCategory={SelectedCategory}
        setSelectedCategory={setSelectedCategory}
      /> */}

      {/* * Videos-Container Passing Category & Videos(Containing API Fetched Data) States  */}
      <VideosBox SelectedCategory={SelectedCategory} Videos={Videos} />
    </Stack>
  );
};

export default Search;
