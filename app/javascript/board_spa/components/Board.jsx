import React from 'react'

import BoardHead from './BoardHead'

class Board extends React.Component {

  render() {
    return (
      <BoardHead title={this.props.data.board.title}/>
    )
  }   
}

export default Board
