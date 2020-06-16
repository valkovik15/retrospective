import React, {useState, useContext} from 'react';
import {useMutation, useSubscription} from '@apollo/react-hooks';
import Card from './Card';
import {
  cardAddedSubscription,
  cardDestroyedSubscription,
  cardUpdatedSubscription,
  addCardMutation
} from './operations.gql';
import UserContext from '../../utils/user_context';
import '../table.css';
const CardColumn = props => {
  const user = useContext(UserContext);
  const {kind, initCards} = props;

  const [cards, setCards] = useState(initCards);
  const [newCard, setNewCard] = useState('');

  const [addCard] = useMutation(addCardMutation);

  useSubscription(cardAddedSubscription, {
    onSubscriptionData: opts => {
      console.log(opts);
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

  useSubscription(cardDestroyedSubscription, {
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {cardDestroyed} = data;
      if (cardDestroyed && cardDestroyed.kind === kind) {
        setCards(oldCards => oldCards.filter(el => el.id !== cardDestroyed.id));
      }
    },
    variables: {boardSlug: window.location.pathname.split('/')[2]}
  });

  useSubscription(cardUpdatedSubscription, {
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {cardUpdated} = data;
      if (cardUpdated && cardUpdated.kind === kind) {
        setCards(oldCards => {
          const cardIdIndex = oldCards.findIndex(
            element => element.id === cardUpdated.id
          );
          if (cardIdIndex >= 0) {
            return [
              ...oldCards.slice(0, cardIdIndex),
              cardUpdated,
              ...oldCards.slice(cardIdIndex + 1)
            ];
          }

          return oldCards;
        });
      }
    },
    variables: {boardSlug: window.location.pathname.split('/')[2]}
  });

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
        console.log(data.addCard.errors.fullMessages.join(' '));
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
        console.log(card);
        return (
          <Card
            key={card.id}
            id={card.id}
            author={card.author.email.split('@')[0]}
            avatar={card.author.avatar.thumb.url}
            body={card.body}
            comments={card.comments}
            likes={card.likes}
            type={kind}
            editable={user === card.author.email}
            deletable={user === card.author.email}
          />
        );
      })}
    </>
  );
};

export default CardColumn;
