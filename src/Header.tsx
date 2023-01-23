// Library import
import { Link } from "react-router-dom";

//Design imports
import { Box, Button } from "@mui/material";

const Header = () => {
  return (
    <Box>
      <Box>
        <Link to="/Pag1">
          <Button
            sx={{ margin: 0.5, backgroundColor: "#24271f" }}
            className="sideButton"
          >
            Page 1
          </Button>
        </Link>
      </Box>
      <Box>
        <Link to="/Pag2">
          <Button
            sx={{
              margin: 0.5,
              backgroundColor: "#24271f",
            }}
            className="sideButton"
          >
            Page 2
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
export default Header;
