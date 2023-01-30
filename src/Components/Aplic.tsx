// Library imports
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios, * as others from 'axios';

//Internal imports

//Design imports

import { Box } from '@mui/material';
import Header from '../Header';
import Form from '../Form';
import Cards from './Cards';
import SimpleSnackbar from './SnakBar';
import { iCard } from './Card';
import Nav from './Nav';

function getToken(): any | undefined {
  const tokenString = sessionStorage.getItem('user');
  const userToken = JSON.parse(tokenString || '{}');
  return userToken;
}

const Aplic = () => {
  const [cards, setCards] = useState<iCard[]>([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const token = getToken();

  const addCard = (name: string, count: number) => {
    setCards([...cards, { id: uuidv4(), name: name, count: count }]);
    axios
      .post('http://localhost:3011/insert/card', {
        name: name,
        count: count,
        id: token.iduser,
      })
      .then(() => {
        console.log('successful');
      });
  };
  const update1 = (id: string) => {
    let newArr = [...cards];
    newArr.map((el) => {
      if (el.id === id) {
        el.count++;

        showMessage(`Cantitatea noua este de: ${el.count}`);
      }
      return el;
    });

    setCards(newArr);
  };

  const handleMinus = (id: string) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        if (card.count > 0) {
          showMessage(`Cantitatea noua este de: ${card.count - 1}`);
          return { ...card, count: card.count - 1 };
        }
      }
      return card;
    });
    setCards(newCards);
  };
  const deleteCards = (id: string) => {
    const card = cards.find((card) => card.id === id);
    setCards(cards.filter((cards) => cards.id !== id));
    showMessage(`Ati sters cardul: ${card?.name}`);
  };

  const showMessage = (message: string) => {
    setIsOpen(true);
    setMessage(message);
  };

  return (
    <Box>
      <Box className='stiky'>
        <Nav />
      </Box>
      <Box className='center'>
        <Box className='Sidebar'>
          <Form addCard={addCard} />
        </Box>
        <Box className='main'>
          <Cards
            cards={cards}
            update1={update1}
            handleMinus={handleMinus}
            deleteCards={deleteCards}
          />
        </Box>
      </Box>
      <Box className='footer' />
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
