// Library imports
import { useState } from "react";

//Design imports
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/material";

interface Props {
  addCard: (name: any, count: any) => void;
}

const Form: React.FC<Props> = (props) => {
  const { addCard } = props;

  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  return (
    <Box>
      <TextField
        className="textL"
        id="name"
        label="Name"
        value={name}
        onChange={handleChange}
        size="small"
        margin="normal"
      />
      <TextField
        className="textL"
        type="number"
        label="Count"
        id="count"
        name="count"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        size="small"
        margin="normal"
      />
      <Button onClick={() => addCard(name, count)}>Add</Button>
    </Box>
  );
};
export default Form;
