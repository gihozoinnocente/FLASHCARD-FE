import React, { ReactElement, FC } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import picture from "../assets/images/cards/img.jpg";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon  from '@mui/icons-material/ModeEditOutline';


const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Flashcards: FC<any> = (): ReactElement => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (

  <>
    <React.Fragment>
    <Button
      variant="contained"
      color="primary"
      sx={{
        marginTop: 5,
        marginLeft: 10,
        width: 120
      }}
      onClick={handleOpen}
    >
      +ADD FLASHCARD
    </Button>
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">CREATING A FLASHCARD</h2>
        <p>Image</p>
        <p>Title</p>
        <p>Description</p>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{ marginLeft: 5, marginRight: 3 }}
        >
          Clear
        </Button>
        <Button variant="contained" color="primary">
          Create
        </Button>
      </Box>
    </Modal>
  </React.Fragment>
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    

      <Card sx={{ maxWidth: 345, marginRight: 5 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={picture}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <DeleteIcon />
            <ModeEditOutlineIcon />
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345, marginRight: 5 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={picture}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <DeleteIcon />
            <ModeEditOutlineIcon />
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 345, marginRight: 5 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={picture}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
            <DeleteIcon />
            <ModeEditOutlineIcon />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  </>
  );
};

export default Flashcards;
