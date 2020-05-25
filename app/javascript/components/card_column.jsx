import React, {useState, useEffect} from 'react';
import Card from './Card';
import ActionCable from 'actioncable';

const CardColumn = props => {
  const {submitPath, kind, initCards, user} = props;

  const [cards, setCards] = useState(initCards);

  const handleMessages = data => {
    const {front_action, card} = data;
    switch (front_action) {
      case 'add_card': {
        if (
          card.kind === kind &&
          cards.findIndex(element => element.id === card.id) === -1
        ) {
          setCards(oldCards => [...oldCards, card]);
        }

        break;
      }

      case 'remove_card': {
        if (card.kind === kind) {
          setCards(oldCards => oldCards.filter(el => el.id !== card.id));
        }

        break;
      }
    }
  };

  useEffect(() => {
    // Обновляем заголовок документа с помощью API браузера
    ActionCable.createConsumer().subscriptions.create(
      {
        channel: 'BoardChannel',
        board: window.location.pathname.slice(
          window.location.pathname.lastIndexOf('/') + 1
        )
      },
      {
        received: handleMessages
      }
    );
  }, [handleMessages]);

  return (
    <>
      <div className="box">
        <form action={submitPath} method="post">
          <h2> Add new {kind} card</h2>
          <input
            type="hidden"
            name="authenticity_token"
            value={document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute('content')}
          />
          <input
            type="hidden"
            name="card[kind]"
            id={`card_${kind}`}
            value={kind}
          />
          <input
            className="input"
            autoComplete="off"
            id={`card_${kind}_body`}
            type="text"
            name="card[body]"
          />
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
          />
        );
      })}
    </>
  );
};

export default CardColumn;
