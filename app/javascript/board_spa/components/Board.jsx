import React from 'react'

import TitleBox from './TitleBox'

class Board extends React.Component {

  render() {
    return (
      <TitleBox title={this.props.data.board.title}/>
    )
  }   
}

export default Board
