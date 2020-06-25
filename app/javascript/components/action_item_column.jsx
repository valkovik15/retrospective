import React, {useState, useContext} from 'react';
import ActionItem from './ActionItem';
import {useBoardSubscription} from '../utils/subscription';
import UserContext from '../utils/user_context';
import './table.css';

const ActionItemColumn = props => {
  const {submitPath, initItems, creators, users} = props;
  const user = useContext(UserContext);

  const [items, setItems] = useState(initItems);

  let submitable = true;

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

  const submitHandler = _ => {
    const prevValue = submitable;
    submitable = false;
    return prevValue;
  };

  return (
    <>
      <h2 className="subtitle">ACTION ITEMS</h2>
      <div className="box">
        <form action={submitPath} method="post" onSubmit={submitHandler}>
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
          <div className="columns is-multiline columns-footer">
            <div className="column column-select">
              <select name="action_item[assignee_id]" className="select">
                <option value=" ">Assigned to ...</option>
                {users.map(user => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="column column-btn-save">
              <button
                className="tag is-info button"
                type="submit"
                onSubmit={submitHandler}
              >
                Add
              </button>
            </div>
          </div>
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
            assignee={item.assignee_name}
            avatar={item.assignee_avatar_url}
          />
        );
      })}
    </>
  );
};

export default ActionItemColumn;
