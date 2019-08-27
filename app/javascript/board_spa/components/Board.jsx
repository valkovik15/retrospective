import React from 'react'

import Header from './Header'

class Board extends React.Component {

  render() {
    const { title, members } = this.props;

    return (
      <Header title={title} members={members}/>
    )
  }   
}

export default Board
