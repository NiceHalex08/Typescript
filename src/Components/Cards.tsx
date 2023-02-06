//Internal imports
import "../App.css";
import Card, { iCard } from "./Card";

// Library imports
import { useState, useEffect } from "react";

//Design imports
import { Box } from "@mui/material";
import React from "react";

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
        {React.Children.toArray(
          cards.map((element) => (
            <Card
              key={element.idcard}
              card={element}
              update1={update1}
              handleMinus={handleMinus}
              deleteCards={deleteCards}
            ></Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Cards;
