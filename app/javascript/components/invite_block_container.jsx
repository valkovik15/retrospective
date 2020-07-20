import React from 'react';
import InviteBlock from './InviteBlock';
import Provider from './Provider';
import BoardSlugContext from '../utils/board_slug_context';

const InviteBlockContainer = () => {
  return (
    <Provider>
      <BoardSlugContext.Provider value={window.location.pathname.split('/')[2]}>
        <InviteBlock />
      </BoardSlugContext.Provider>
    </Provider>
  );
};

export default InviteBlockContainer;
