//Internal imports
import "../App.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Design improts
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const theme = createTheme();
interface User {
  iduser: string;
  username: string;
  userpass: string;
}
interface Props {
  setToken: (userToken: any) => void;
}
const Login: React.FC<Props> = ({ setToken }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User[]>([
    { iduser: "", username: "", userpass: "" },
  ]);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const onChangeUsername = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:3011/user");
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    if (typeof username === "undefined") setMessage("Nu ati introdus emailul!");
    else if (typeof password === "undefined")
      setMessage("Nu ati introdus parola!");
    else {
      let check = 0;
      user.map((us) => {
        console.log(us);
        if (us.username === username && us.userpass === password) {
          setToken(us);
          check = 1;
        }
      });
      check === 1 ? navigate("/aplic") : setMessage("Date incorecte");
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Username"
              name="username"
              autoComplete="user"
              autoFocus
              color="success"
              value={username}
              onChange={(e) => onChangeUsername(e)}
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
              value={password}
              onChange={(e) => onChangePassword(e)}
            />

            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              color="success"
              onClick={handleClick}
            >
              Sign In
            </Button>
            {message}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Login;
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
