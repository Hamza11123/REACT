import { Paper } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import Context from "../Context/Context";

const SearchBar = () => {
  // ! console.log(REACT_APP_RAPID_API_KEY)
  const { Videos, setVideos, Search } = useContext(Context);

  const ref = useRef();

  const onInput = (e) => {
    console.log(ref.current.value);
  };

  return (
    // * Important-Information:-
    // * A paper is nothing but a <simple-div> that has some special properties
    <Paper
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        Search(ref);
      }}
      // square
      sx={{
        // bgcolor: { xs: "pink", sm: '#fff', md: 'red', xl: 'green', lg: "yellow" },
        // p: "0 0.34rem 0.32rem 0.32rem",
        padding: "0.14rem",
      }}
    >
      <input
        id="SEARCHBAR"
        type="text"
        ref={ref}
        onChange={onInput}
        style={{
          outline: "none",
          border: "none",
        }}
        placeholder="Search"
      />

      <SearchIcon
        style={{
          position: "relative",
          top: "3px",
          cursor: "pointer",
        }}
        onClick={Search}
      />
    </Paper>
  );
};

export default SearchBar;
