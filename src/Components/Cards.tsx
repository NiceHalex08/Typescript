//Internal imports
import "../App.css";
import Card, { iCard } from "./Card";

//Design imports
import { Box } from "@mui/material";

interface Props {
  cards: iCard[];
  handleMinus: (id: string) => void;
  update1: (id: string) => void;
  deleteCards: (id: string) => void;
}

const Cards: React.FC<Props> = (props) => {
  const { cards, update1, handleMinus, deleteCards } = props;

  return (
    <Box className="objcontent">
      <Box className="btnArea"></Box>
      <Box className="cardsArea">
        {cards.map((element) => (
          <Card
            key={element.id}
            card={element}
            update1={update1}
            handleMinus={handleMinus}
            deleteCards={deleteCards}
          ></Card>
        ))}
      </Box>
    </Box>
  );
};

export default Cards;
