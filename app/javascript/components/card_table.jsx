import React, {useState} from 'react';
import PrevActionItemColumn from './prev_action_item_column';
import CardColumn from './card_column';
import ActionItemColumn from './action_item_column';
import UserContext from '../utils/user_context';

const CardTable = props => {
  const {
    actionItems,
    board,
    cardsByType,
    creators,
    initPrevItems,
    user
  } = props;
  const {mad, sad, glad} = cardsByType;
  const [columnClass, setColumnClass] = useState(
    initPrevItems.length > 0 ? 'column is-one-fifth' : 'column is-one-fourth'
  );

  const [displayPrevItems, setDisplayPrevItems] = useState(
    initPrevItems.length > 0
  );

  const prevActionsEmptyHandler = () => {
    setDisplayPrevItems(false);
    setColumnClass('column is-one-fourth');
  };

  return (
    <UserContext.Provider value={user}>
      <div className="columns">
        {displayPrevItems ? (
          <div className={columnClass}>
            <PrevActionItemColumn
              creators={creators}
              handleEmpty={prevActionsEmptyHandler}
              initItems={initPrevItems || []}
            />
          </div>
        ) : null}

        <div className={columnClass}>
          <h2 className="subtitle">MAD</h2>
          <CardColumn
            kind="mad"
            initCards={mad}
            submitPath={`/boards/${board.slug}/cards`}
          />
        </div>

        <div className={columnClass}>
          <h2 className="subtitle">SAD</h2>
          <CardColumn
            kind="sad"
            initCards={sad}
            submitPath={`/boards/${board.slug}/cards`}
          />
        </div>

        <div className={columnClass}>
          <h2 className="subtitle">GLAD</h2>
          <CardColumn
            kind="glad"
            initCards={glad}
            submitPath={`/boards/${board.slug}/cards`}
          />
        </div>

        <div className={columnClass}>
          <ActionItemColumn
            creators={creators}
            initItems={actionItems || []}
            submitPath={`/boards/${board.slug}/action_items`}
          />
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default CardTable;
