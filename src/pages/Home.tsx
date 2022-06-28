import React, { ReactElement, FC } from "react";
import { Box, Card, CardActionArea, CardContent, CardMedia, CssBaseline, Grid, Typography } from "@mui/material";
import picture from "../assets/images/cards/img8.jpg";

const Home: FC<any> = (): ReactElement => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <Typography>Home</Typography> */}

      <Box sx={{display: "flex", flexDirection:"column"}}>
        <Box>
        <Card sx={{ maxWidth: 4000, marginRight: 0, }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="470"
            image={picture}
            alt="green iguana"
          />
          <CardContent>
          </CardContent>
        </CardActionArea>
      </Card>
        </Box>
        {/* <Box sx={{marginLeft:1}}>
          <Typography>Check</Typography>
        </Box> */}
      </Box>
     
   
    </Box>
  );
};

export default Home;