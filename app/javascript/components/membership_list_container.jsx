import React from 'react';
import MembershipList from './MembershipList';
import Provider from './Provider';

const MembershipListContainer = () => {
  return (
    <Provider>
      <MembershipList />
    </Provider>
  );
};

export default MembershipListContainer;
