// Library imports
import { useState, useEffect } from "react";

//Design imports
import { Button, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import axios from "axios";

export interface iCard {
  idcard: string;
  name: string;
  count: number;
  username: string;
}
interface Props {
  key: string;
  card: iCard;
  handleMinus: (id: string) => void;
  update1: (id: string) => void;
  deleteCards: (id: string) => void;
}

const Card: React.FC<Props> = (props) => {
  const { card: element, update1, handleMinus, deleteCards } = props;
  const [value, setValue] = useState<string>("");
  const [isInput, setIsInput] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  const onSave = () => {
    element.name = value;
    let get = document.getElementById(element.idcard);
    if (get) {
      get.innerHTML = value;
    }
    axios
      .post("http://localhost:3011/update/name", {
        name: value,
        id: element.idcard,
      })
      .then(() => {
        console.log("successful update name " + value);
      });
  };
  return (
    <Box className="obj">
      <Box id="ename">
        <Typography>Name: {element.name}</Typography>

        <Button
          sx={{ fontSize: "small" }}
          startIcon={<EditIcon />}
          onClick={() => setIsInput(!isInput)}
        />
        {isInput ? (
          <Box>
            <TextField
              id="input"
              label="New Name"
              value={value}
              onChange={(e) => onChange(e)}
              size="small"
              margin="normal"
            />

            <Button startIcon={<SaveIcon />} onClick={onSave}></Button>
          </Box>
        ) : (
          <Box>{value}</Box>
        )}
      </Box>

      <p>count:{element.count}</p>

      <Button
        startIcon={<AddCircleIcon />}
        sx={{ margin: 0.5, backgroundColor: "skyblue" }}
        onClick={() => update1(element.idcard)}
      ></Button>
      <Button
        startIcon={<RemoveCircleIcon />}
        sx={{ margin: 0.5, backgroundColor: "skyblue" }}
        onClick={() => handleMinus(element.idcard)}
      ></Button>
      <Button
        startIcon={<DeleteIcon />}
        sx={{ margin: 0.5, backgroundColor: "skyblue" }}
        onClick={() => deleteCards(element.idcard)}
      />
    </Box>
  );
};
export default Card;
