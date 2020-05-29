import React, {useState} from 'react';
import ActionItem from './ActionItem';
import {useBoardSubscription} from '../utils/subscription';

const ActionItemColumn = props => {
  const {submitPath, initItems, user, creators} = props;

  const [items, setItems] = useState(initItems);

  const handleMessages = data => {
    const {front_action, card} = data;
    switch (front_action) {
      case 'add_action_item':
      case 'move_action_item': {
        setItems(oldItems => [...oldItems, card]);
        break;
      }

      case 'remove_action_item': {
        setItems(oldItems => oldItems.filter(el => el.id !== card.id));
        break;
      }

      case 'update_action_item': {
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
    }
  };

  useBoardSubscription(handleMessages);

  return (
    <>
      <h2 className="subtitle">ACTION ITEMS</h2>
      <div className="box">
        <form action={submitPath} method="post">
          <h2> Add new action item card</h2>
          <input
            type="hidden"
            name="authenticity_token"
            value={document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute('content')}
          />
          <input
            className="input"
            autoComplete="off"
            id="action_item_body`"
            type="text"
            name="action_item[body]"
          />
        </form>
      </div>
      {items.map(item => {
        return (
          <ActionItem
            key={item.id}
            id={item.id}
            body={item.body}
            times_moved={item.times_moved}
            editable={creators.includes(user)}
            deletable={creators.includes(user)}
          />
        );
      })}
    </>
  );
};

export default ActionItemColumn;
