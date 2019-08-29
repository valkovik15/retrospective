import React from 'react'

import Header from './header/Header'
import Columns from './columns/Columns'

class Board extends React.Component {

  render() {
    const { title, members } = this.props;

    return (
      <React.Fragment>
        <div className='text lable'>BOARD</div>
        <Header title={title} members={members}/>
        <Columns />
      </React.Fragment>
    )
  }   
}

export default Board
