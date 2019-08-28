import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/Board'

import { current_user, board } from './fake_json'
import './styles/board'
import './styles/member_list'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Board { ...board }/>,
      document.getElementById('board-spa'),
    )
  })
