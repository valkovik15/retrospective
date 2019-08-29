import React from 'react'

import Header from './header/Header'
import Columns from './columns/Columns'

class Board extends React.Component {

  render() {
    const { title, members, columns, action_items, prev_action_items } = this.props;

    return (
      <React.Fragment>
        <div className='text lable'>BOARD</div>
        <Header title={title} members={members}/>
        <Columns columns={columns} action_items={action_items} prev_action_items={prev_action_items}/>
      </React.Fragment>
    )
  }   
}

export default Board
