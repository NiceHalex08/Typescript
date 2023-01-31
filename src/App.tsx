// Library imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Internal imports
import "./App.css";

import { Box } from "@mui/material";
import Pag1 from "./routes/Pag1";
import Pag2 from "./routes/Pag2";
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
          <Route path="/Pag1" element={<Pag1 />} />
          <Route path="/Pag2" element={<Pag2 />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
