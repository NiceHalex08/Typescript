// Library imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Internal imports
import "./App.css";

import { Box } from "@mui/material";
import Aplic from "./Components/Aplic";
import Login from "./Components/Login";

function setToken(userToken: any) {
  sessionStorage.setItem("user", JSON.stringify(userToken));
}

const App = () => {
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/aplic" element={<Aplic />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
