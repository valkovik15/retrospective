import React from 'react';
import InviteBlock from './InviteBlock';
import Provider from './Provider';

const InviteBlockContainer = props => {
  return (
    <Provider>
      <InviteBlock boardSlug={props.boardSlug} />
    </Provider>
  );
};

export default InviteBlockContainer;
