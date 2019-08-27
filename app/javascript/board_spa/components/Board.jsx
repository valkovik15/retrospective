import React from 'react'

import Top from './Top'

class Board extends React.Component {

  render() {
    const { title, members } = this.props.board;

    return (
      <Top title={title} members={members}/>
    )
  }   
}

export default Board
