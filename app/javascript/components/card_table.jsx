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

  const generateColumns = cardTypePairs => {
    const content = [];
    for (const [columnName, cards] of Object.entries(cardTypePairs)) {
      content.push(
        <div key={`${columnName}_column`} className={columnClass}>
          <h2 className="subtitle">{columnName.toUpperCase()}</h2>
          <CardColumn
            key={columnName}
            kind={columnName}
            initCards={cards}
            submitPath={`/boards/${board.slug}/cards`}
          />
        </div>
      );
    }

    return content;
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

        {generateColumns(cardsByType)}

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
