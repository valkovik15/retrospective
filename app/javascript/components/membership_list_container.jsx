import React from 'react';
import MembershipList from './MembershipList';
import Provider from './Provider';
import BoardSlugContext from '../utils/board_slug_context';

const MembershipListContainer = () => {
  return (
    <Provider>
      <BoardSlugContext.Provider value={window.location.pathname.split('/')[2]}>
        <MembershipList />
      </BoardSlugContext.Provider>
    </Provider>
  );
};

export default MembershipListContainer;
