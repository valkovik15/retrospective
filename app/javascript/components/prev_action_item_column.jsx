import React, {useState} from 'react';
import ActionItem from './ActionItem';
import {useBoardSubscription} from '../utils/subscription';

const PrevActionItemColumn = props => {
  const {creators, handleEmpty, initItems, user} = props;

  const [items, setItems] = useState(initItems);

  const handleMessages = data => {
    const {front_action, card} = data;
    switch (front_action) {
      case 'move_action_item':
        setItems(oldItems => {
          const newItems = oldItems.filter(el => el.id !== card.id);
          if (newItems.length === 0) {
            handleEmpty();
          }

          return newItems;
        });
        break;
      case 'close_action_item':
      case 'complete_action_item':
      case 'reopen_action_item':
        setItems(oldItems => {
          const cardIdIndex = oldItems.findIndex(
            element => element.id === card.id
          );
          if (cardIdIndex >= 0) {
            return [
              ...oldItems.slice(0, cardIdIndex),
              card,
              ...oldItems.slice(cardIdIndex + 1)
            ];
          }

          return oldItems;
        });
        break;
    }
  };

  useBoardSubscription(handleMessages);

  return (
    <>
      <h2 className="subtitle">PREVIOUS BOARD</h2>
      {items.map(item => {
        return (
          <ActionItem
            key={item.id}
            id={item.id}
            body={item.body}
            status={item.status}
            times_moved={item.times_moved}
            movable={creators.includes(user) && item.status === 'pending'}
            transitionable={{
              can_close: creators.includes(user) && item.status === 'pending',
              can_complete:
                creators.includes(user) && item.status === 'pending',
              can_reopen: creators.includes(user) && item.status !== 'pending'
            }}
          />
        );
      })}
    </>
  );
};

export default PrevActionItemColumn;
