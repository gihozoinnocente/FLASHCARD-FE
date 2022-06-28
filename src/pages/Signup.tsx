import React, { ReactElement, FC } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import {
  Container,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { gql, useMutation } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";


const SIGNIN_USER = gql`
 mutation{
  signup(email:"gihozo100@gmail.com",password:"Pass@123",name:"hiio")
{
  token
  user{
    email
  }
}
}
`;

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

  // const {
  //   register,
  //   handleSubmit,
  // } = useForm<IFormInput>();

  // const { heading, submitButton } = useStyles();

  // const [json, setJson] = useState<string>();

  // const onSubmit = (data: IFormInput) => {
  //   setJson(JSON.stringify(data));
  // };

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorField, setErrorField] = React.useState<boolean>(false);
  const [helperText, setHelperText] = React.useState<string>("");
  const [signUpError, setSignUpError] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [userRegister, { data, loading, error }] = useMutation(SIGNIN_USER, {
    onError: (error) => {
      setSignUpError(error.message);
      setOpen(true);
    },
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setErrorField(true);
      setHelperText("All Fields are required");
      return;
    }
    console.log({
      email: dataForm.get("email"),
      password: dataForm.get("password"),
      name: dataForm.get("name"),
    });
    userRegister({
      variables: {
        input: {
          name: dataForm.get("name"),
          email: dataForm.get("email"),
          password: dataForm.get("password"),
        },
      },
    });
  };

  console.log({ data, loading, error });

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
      {/* <ThemeProvider theme={theme}> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {signUpError}
            </Alert>
          </Snackbar> */}
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  error={errorField}
                  helperText={helperText}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  autoComplete="email"
                  error={errorField}
                  helperText={helperText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={errorField}
                  helperText={helperText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color= "primary"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "primary.main" }}>
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    {/* </ThemeProvider> */}
    </Box>
    
  );
};

export default Signup;
