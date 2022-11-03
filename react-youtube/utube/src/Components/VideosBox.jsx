import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

const VideosBox = ({ SelectedCategory, Videos }) => {
  if (Videos) {
    console.log("From Videobox: ", Videos);
  }
  return (
    <Box
      sx={{ maxWidth: { xl: "93rem", lg: "72rem" } }}
      style={{ margin: "0rem auto", padding: "2rem" }}
    >
      <h1>{SelectedCategory} - Videos</h1>
      <Stack
        flexDirection={"row"}
        justifyContent={"center"}
        gap={"1rem"}
        sx={{
          p: "1rem",
          // background: { xs: 'red', sm: 'orange', md: 'yellow', lg: 'white', xl: 'cyan' }
        }}
        flexWrap={"wrap"}
      >
        {Videos &&
          Videos.items?.map((item, ind) => (
            // <Box key={ind} sx={{
            //   border: '2px solid red',
            //   height: '10rem',
            //   width: '10rem',
            //   p: '2rem'
            // }}>
            //   <h3 >Hey there this is demo title</h3></Box>
            <>
              <Link to={`/video/${item?.id?.videoId}`}>
                {item?.id?.videoId && <VideoCard item={item} />}
              </Link>

              {item?.id?.channelId && <ChannelCard item={item} />}
            </>
          ))}
      </Stack>
    </Box>
  );
};

export default VideosBox;
