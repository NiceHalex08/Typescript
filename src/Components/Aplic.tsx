// Library imports
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios, * as others from "axios";

//Internal imports
import Form from "../Form";
import Cards from "./Cards";
import SimpleSnackbar from "./SnakBar";
import { iCard } from "./Card";
import Nav from "./Nav";

//Design imports

import { Box } from "@mui/material";

function getToken(): any | undefined {
  const tokenString = sessionStorage.getItem("user");
  const userToken = JSON.parse(tokenString || "{}");
  return userToken;
}

const Aplic = () => {
  const [cards, setCards] = useState<iCard[]>([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const token = getToken();

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3011/itemCard");
    console.log(response);
    setCards(response.data);
  };
  useEffect(() => {
    fetchData().catch(() => console.log("err"));
    // elements().catch(() => console.log("err"));
    console.log(cards);
  }, []);
  // const elements = () => {
  //   if (token.username != "admim")
  //     setCards(cards.filter((cards) => cards.username == token.username));
  // };

  const addCard = (name: string, count: number) => {
    axios
      .post("http://localhost:3011/insert/card", {
        name: name,
        count: count,
        id: token.iduser,
      })
      // "SELECT card.idcard,card.name, card.count, user.username from card inner join user on card.iduser=user.iduser"
      .then(() => {
        fetchData()
          .then(() => {
            console.log("success minus");
          })
          .catch(() => {
            console.log("eroare");
          });
      });
  };
  const update1 = (id: string) => {
    let newArr = [...cards];
    const el = newArr.find((el) => el.idcard === id);
    console.log(el);
    if (el) {
      axios
        .post(
          "http://localhost:3011/update/count",
          {
            count: el.count + 1,
            id: el.idcard,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then(() => {
          fetchData()
            .then(() => {
              console.log("success minus");
            })
            .catch(() => {
              console.log("eroare");
            });
        });
      showMessage(`Cantitatea noua este de: ${el.count}`);
    }
  };

  const handleMinus = (id: string) => {
    const card = cards.find((item) => item.idcard === id);
    if (!card) return;
    if (card.count > 0) {
      axios
        .post("http://localhost:3011/update/count", {
          count: card.count - 1,
          id: id,
        })
        .then(() => {
          fetchData()
            .then(() => {
              console.log("success minus");
            })
            .catch(() => {
              console.log("eroare");
            });
        });
      showMessage(`Cantitatea noua este de: ${card.count - 1}`);
      return { ...card, count: card.count - 1 };
    }
  };

  const deleteCards = (id: string) => {
    const card = cards.find((card) => card.idcard === id);
    setCards(cards.filter((cards) => cards.idcard !== id));
    axios
      .post("http://localhost:3011/delete/id", {
        id: id,
      })
      .then(() => {
        console.log("successful delete");
      });
    showMessage(`Ati sters cardul: ${card?.name}`);
  };

  const showMessage = (message: string) => {
    setIsOpen(true);
    setMessage(message);
  };

  return (
    <Box>
      <Box className="stiky">
        <Nav />
      </Box>
      <Box className="center">
        <Box className="Sidebar">
          <Form addCard={addCard} />
        </Box>
        <Box className="main">
          <Cards
            cards={cards}
            update1={update1}
            handleMinus={handleMinus}
            deleteCards={deleteCards}
          />
        </Box>
      </Box>
      <Box className="footer" />
      {
        <SimpleSnackbar
          message={message}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      }
    </Box>
  );
};
export default Aplic;
