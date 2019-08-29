import React from 'react'
import ReactDOM from 'react-dom'
import Board from './components/Board'

import { board } from './fake_json'
//import { current_user } from './fake_json'

import './styles/board'
import './styles/member_list'
import './styles/card'
import './styles/button'

//export const CurrentUserContext = React.createContext(current_user)

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Board { ...board }/>,
      document.getElementById('board-spa'),
    )
  })
