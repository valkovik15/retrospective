import React from 'react';
import ReactDOM from 'react-dom';
import ReadyButton from '../components/ReadyButton';
import Provider from '../components/Provider';
import BoardSlugContext from '../utils/board_slug_context';

const element = (
  <Provider>
    <BoardSlugContext.Provider value={window.location.pathname.split('/')[2]}>
      <ReadyButton />
    </BoardSlugContext.Provider>
  </Provider>
);
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(element, document.querySelector('#ready-button'));
});
