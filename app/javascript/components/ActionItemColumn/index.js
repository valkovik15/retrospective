import React, {useState, useContext, useEffect} from 'react';
import {useMutation, useSubscription} from '@apollo/react-hooks';
import ActionItem from '../ActionItem';
import UserContext from '../../utils/user_context';
import BoardSlugContext from '../../utils/board_slug_context';
import {
  actionItemAddedSubscription,
  addActionItemMutation,
  actionItemMovedSubscription,
  actionItemDestroyedSubscription,
  actionItemUpdatedSubscription
} from './operations.gql';
import '../table.css';

const ActionItemColumn = props => {
  const user = useContext(UserContext);
  const boardSlug = useContext(BoardSlugContext);
  const [items, setItems] = useState(props.initItems);
  const [newActionItemBody, setNewActionItemBody] = useState('');
  const [newActionItemAssignee, setNewActionItemAssignee] = useState('');
  const [skip, setSkip] = useState(true); // Workaround for https://github.com/apollographql/react-apollo/issues/3802

  const [addActionItem] = useMutation(addActionItemMutation);

  useSubscription(actionItemUpdatedSubscription, {
    skip,
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {actionItemUpdated} = data;
      if (actionItemUpdated) {
        updateItem(actionItemUpdated);
      }
    },
    variables: {boardSlug}
  });

  useSubscription(actionItemAddedSubscription, {
    skip,
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {actionItemAdded} = data;
      if (actionItemAdded) {
        setItems(oldItems => [...oldItems, actionItemAdded]);
      }
    },
    variables: {boardSlug}
  });

  useSubscription(actionItemMovedSubscription, {
    skip,
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {actionItemMoved} = data;
      if (actionItemMoved) {
        setItems(oldItems => [...oldItems, actionItemMoved]);
      }
    },
    variables: {boardSlug}
  });

  useSubscription(actionItemDestroyedSubscription, {
    skip,
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {actionItemDestroyed} = data;
      if (actionItemDestroyed) {
        setItems(oldItems =>
          oldItems.filter(el => el.id !== actionItemDestroyed.id)
        );
      }
    },
    variables: {boardSlug}
  });

  useEffect(() => {
    setSkip(false);
  }, []);

  const updateItem = item => {
    setItems(oldItems => {
      const cardIdIndex = oldItems.findIndex(element => element.id === item.id);
      if (cardIdIndex >= 0) {
        return [
          ...oldItems.slice(0, cardIdIndex),
          item,
          ...oldItems.slice(cardIdIndex + 1)
        ];
      }

      return oldItems;
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    addActionItem({
      variables: {
        boardSlug,
        assigneeId: newActionItemAssignee,
        body: newActionItemBody
      }
    }).then(({data}) => {
      if (data.addActionItem.actionItem) {
        setNewActionItemBody('');
      } else {
        console.log(data.addActionItem.errors.fullMessages.join(' '));
      }
    });
  };

  const {creators, users} = props;

  return (
    <>
      <h2 className="subtitle">ACTION ITEMS</h2>
      <div className="box">
        <form onSubmit={submitHandler}>
          <input
            className="input"
            autoComplete="off"
            id="action_item_body`"
            type="text"
            value={newActionItemBody}
            onChange={e => setNewActionItemBody(e.target.value)}
          />
          <div className="columns is-multiline columns-footer">
            <div className="column column-select">
              <select
                className="select"
                onChange={e => setNewActionItemAssignee(e.target.value)}
              >
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
