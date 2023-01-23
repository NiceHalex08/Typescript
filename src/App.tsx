// Library import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Internal imports
import "./App.css";

import { Box } from "@mui/material";
import Pag1 from "./routes/Pag1";
import Pag2 from "./routes/Pag2";
import Aplic from "./Components/Aplic";

const App = () => {
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/" element={<Aplic />} />
          <Route path="/Pag1" element={<Pag1 />} />
          <Route path="/Pag2" element={<Pag2 />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
