import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NewsItem = (props) => {
  const Null_DummyImage =
    "https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png";
  const { title, description, imageSrc } = props;
  return (
    <Card sx={{ width: "18rem", mx: "0.6rem", my: "1.2rem", pb: "1" }}>
      <CardMedia
        component="img"
        height="140"
        image={props.urlToImage ? props.urlToImage : Null_DummyImage}
        alt="there is no image"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          href={props.url}
          target="_blank"
          sx={{ py: 1, px: "0.6" }}
          variant="contained"
          size="small"
        >
          Explore More
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsItem;
