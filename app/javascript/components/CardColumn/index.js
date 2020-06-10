import React, {useState, useContext} from 'react';
import {useMutation, useSubscription} from '@apollo/react-hooks';
import Card from './Card';
import {useBoardSubscription} from '../../utils/subscription';
import {cardSubscription, addCardMutation} from './operations.gql';
import UserContext from '../utils/user_context';
import './table.css';
const CardColumn = props => {
  const user = useContext(UserContext);
  const {submitPath, kind, initCards} = props;

  const [cards, setCards] = useState(initCards);
  const [newCard, setNewCard] = useState('');

  const [addCard] = useMutation(addCardMutation);

  useSubscription(cardSubscription, {
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {cardAdded} = data;
      if (cardAdded) {
        if (
          cardAdded.kind === kind &&
          cards.findIndex(element => element.id === cardAdded.id) === -1
        ) {
          setCards(oldCards => [...oldCards, cardAdded]);
        }
      }
    },
    variables: {boardSlug: window.location.pathname.split('/')[2]}
  });

  const handleMessages = data => {
    const {front_action, card} = data;
    switch (front_action) {
      case 'remove_card': {
        if (card.kind === kind) {
          setCards(oldCards => oldCards.filter(el => el.id !== card.id));
        }

        break;
      }

      case 'update_card': {
        if (card.kind === kind) {
          setCards(oldCards => {
            const cardIdIndex = oldCards.findIndex(
              element => element.id === card.id
            );
            if (cardIdIndex >= 0) {
              return [
                ...oldCards.slice(0, cardIdIndex),
                card,
                ...oldCards.slice(cardIdIndex + 1)
              ];
            }

            return oldCards;
          });
        }

        break;
      }
    }
  };

  useBoardSubscription(handleMessages);

  const submitHandler = e => {
    e.preventDefault();
    addCard({
      variables: {
        boardSlug: window.location.pathname.split('/')[2],
        kind,
        body: newCard
      }
    }).then(({data}) => {
      if (data.addCard.card) {
        setNewCard('');
      } else {
        console.log(data.addCard.error);
      }
    });
  };

  return (
    <>
      <div className="box">
        <form onSubmit={submitHandler}>
          <h2> Add new {kind} card</h2>
          <input
            className="input"
            autoComplete="off"
            id={`card_${kind}_body`}
            type="text"
            value={newCard}
            onChange={e => setNewCard(e.target.value)}
          />
          <div className="btn-save">
            <button
              className="tag is-info button"
              type="submit"
              onSubmit={submitHandler}
            >
              Add
            </button>
          </div>
        </form>
      </div>

      {cards.map(card => {
        return (
          <Card
            key={card.id}
            id={card.id}
            author={card.author.email.split('@')[0]}
            avatar={card.author.avatar.thumb.url}
            body={card.body}
            likes={card.likes}
            type={kind}
            editable={user === card.author.email}
            deletable={user === card.author.email}
            comments={card.comments}
          />
        );
      })}
    </>
  );
};

export default CardColumn;
