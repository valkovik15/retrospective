import React from 'react';
import ReactDOM from 'react-dom';
import ReadyButton from '../components/ReadyButton';
import Provider from '../components/Provider';

const element = (
  <Provider>
    <ReadyButton />
  </Provider>
);
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(element, document.querySelector('#ready-button'));
});
