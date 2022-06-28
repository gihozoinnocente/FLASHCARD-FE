import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const SIGNUP_USER = gql`
    mutation {
      signup(name:"hhh",email:"gihozo100@gmail.com",password:"Pass@123")
{
  token
  user{
    email
  }
}
}
`;

const theme = createTheme();

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const navigate = useNavigate();
  const [name,setName]=React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorField, setErrorField] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [signUpError, setSignUpError] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [userSignUp, { data, loading, error }] = useMutation(SIGNUP_USER, {
    onError: (error) => {
      setSignUpError(error.message);
      setOpen(true);
    },
    onCompleted: (userSignUp) => {
      localStorage.setItem("auth", JSON.stringify(userSignUp.signup));
      navigate("/about");
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
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorField(true);
      setHelperText("All Fields are required");
      return;
    }
    console.log({
      email: dataForm.get("email"),
      password: dataForm.get("password"),
      name: dataForm.get("name"),
    });
    userSignUp({
      variables: {
        input: {
          email: dataForm.get("email"),
          password: dataForm.get("password"),
          name: dataForm.get("name")
        },
      },
    });
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
    <ThemeProvider theme={theme}>
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
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {signUpError}
            </Alert>
          </Snackbar>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              error={errorField}
              helperText={helperText}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={errorField}
              helperText={helperText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={errorField}
              helperText={helperText}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Sign Up "
              )}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "primary.main" }}>
                    {"Already have an account? Sign in"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Box>
  );
}
function SIGNIN_USER(SIGNIN_USER: any, arg1: { onError: (error: import("@apollo/client").ApolloError) => void; onCompleted: (userSignUp: any) => void; }): [any, { data: any; loading: any; error: any; }] {
  throw new Error("Function not implemented.");
}

