// Library imports
import * as React from "react";

//Design imports
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertColor } from "@mui/material";

interface SimpleSnackbar {
  message: string;
  isOpen: boolean;
  setIsOpen: (id: boolean) => void;
  severity?: string;
}

const SimpleSnackbar: React.FC<SimpleSnackbar> = ({
  message,
  severity = "success",
  isOpen,
  setIsOpen,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleCloseButton = () => {
    setIsOpen(false);
  };
  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };
  // Renders a message

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small">
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseButton}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert severity={severity as AlertColor} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SimpleSnackbar;
