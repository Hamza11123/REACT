import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

// * THIS COMPONENT IS USED IN BOTH PLACES,
// * 1. IN THE [SEARCH-RESULTS]
// * 2. IN THE [CHANNEL-HOME-PAGE]
const ChannelCard = ({ item, marginTop }) => {
  // console.log(item.snippet.thumbnails.default.url)
  return (
    <Stack
      // position={"relative"}
      // top={(isChannelHome && -85) || ""}
      mx={marginTop && "auto"}
      mt={marginTop || ""} // * it would work On The "Channel-Home-Page" when we pass top-margin through {{props}}
      sx={{ width: "280px" }}
      justifyContent="center"
      alignItems={"center"}
    >
      <Link
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        to={`/channel/${item.id.channelId || item.id}`} // * if {{first_one_fails}} then try {{second_one}}
      >
        {item && (
          <Avatar
            alt="Remy Sharp"
            src={item?.snippet?.thumbnails?.default?.url}
            sx={{ width: 160, height: 160, cursor: "pointer" }}
          />
        )}
        <h2
          style={{
            color: "#fff",
            margin: "1.1rem 0 0.64rem 0",
            textAlign: "center",
          }}
        >
          {item?.snippet?.title}
        </h2>
        <h4
          style={{
            color: "rgb(154, 154, 154)",
            margin: "auto",
            textAlign: "center",
          }}
        >
          {item?.statistics?.subscriberCount} Subscribers
        </h4>
      </Link>
    </Stack>
  );
};

export default ChannelCard;
