//Internal imports
import "../App.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Login<T>(setToken: T) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const fetchData = () => {
    fetch("http://localhost:5050/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const handleSubmit = (event: {
  //   preventDefault: () => void;
  //   currentTarget: HTMLFormElement | undefined;
  // }) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };
  const handleClick = () => {
    if (typeof email === "undefined") setMessage("Nu ati introdus emailul!");
    else if (typeof password === "undefined")
      setMessage("Nu ati introdus parola!");
    else {
      let check = 0;
      user.map((us) => {
        console.log(us);
        //   if (
        //     us.username.toLowerCase() === email.toLowerCase() &&
        //     us.userpass === password

        //   ) {
        //     setToken(us);
        //     check = 1;
        //   }
      });
      check === 1 ? navigate("/program") : setMessage("Date incorecte");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#bcbd8b",
            borderRadius: "15px",
            padding: "40px",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: "white" }}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleClick}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="success"
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
              color="success"
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
