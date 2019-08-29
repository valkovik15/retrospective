import React from 'react'

import Header from './header/Header'

class Board extends React.Component {

  render() {
    const { title, members } = this.props;

    return (
      <React.Fragment>
        <div className='text lable'>BOARD</div>
        <Header title={title} members={members}/>
      </React.Fragment>
    )
  }   
}

export default Board
