import React from 'react'

import Column from './Column'
import PrevActionItems from './PrevActionItems'
import ActionItems from './ActionItems'

class Columns extends React.Component {
  render() {
    const { action_items, prev_action_items } = this.props;

    const columns = this.props.columns.map(function(column) {
      return(<Column title={column.title} cards={column.cards}/>)
    });

    return (
      <div className='column component lvl1'>
        <div className='text lable'>COLUMNS</div>

        <div className='columns'>
          {prev_action_items && (<PrevActionItems prev_action_items={prev_action_items}/>)}
          {columns}
          <ActionItems action_items={action_items}/>
        </div>
      </div>
    )
  }
}

export default Columns
