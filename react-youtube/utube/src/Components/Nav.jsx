import { Box, fontSize, Stack } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchBar from "./SearchBar";
import { Padding } from "@mui/icons-material";
// import MenuIcon from '@mui/icons-material/Menu';
const Nav = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={"#241d1d"}
      p={"0.6rem 1rem"}
    >
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        to="/"
      >
        <YouTubeIcon color="error" sx={{ fontSize: "3rem" }} />

        <div
          style={{
            color: "#fff",
            fontSize: "1.7rem",
            fontWeight: "bold",
            paddingBottom: "0.3rem",
            transform: "rotateY(45deg)",
            marginLeft: "-0.7rem",
          }}
        >
          YouTube
        </div>
      </Link>

      <SearchBar />
    </Stack>
  );
};

export default Nav;
