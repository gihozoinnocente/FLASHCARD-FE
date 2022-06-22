import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import {
  Container,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  firstName: string;
  email: string;
  password: string;
}
const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
    },
  }));
const Signup: FC<any> = (): ReactElement => {

  const {
    register,
    handleSubmit,
  } = useForm<IFormInput>();

  const { heading, submitButton } = useStyles();

  const [json, setJson] = useState<string>();

  const onSubmit = (data: IFormInput) => {
    setJson(JSON.stringify(data));
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
     <Typography className={heading} variant="h3">
       Sign Up Form
     </Typography>
 
     <form onSubmit={handleSubmit(onSubmit)} noValidate>
     <TextField
         {...register("firstName")}
         variant="outlined"
         margin="normal"
         label="Names"
         fullWidth
         required
       />
       <TextField
         {...register("email")}
         variant="outlined"
         margin="normal"
         label="Email"
         fullWidth
         required
       />
      
       <TextField
         {...register("password")}
         variant="outlined"
         margin="normal"
         label="Password"
         type="password"
         fullWidth
         required
       />
       <Button
         type="submit"
         fullWidth
         variant="contained"
         className={submitButton}
        color= "primary"
       >
         Sign Up
       </Button>
       {json && (
         <>
           <Typography variant="body1">
             clickable
           </Typography>
           <Typography variant="body2">{json}</Typography>
         </>
       )}
     </form>
   </Container>
    </Box>
    
  );
};

export default Signup;