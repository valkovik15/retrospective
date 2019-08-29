import React from 'react'

import PrevActionItem from './cards/ActionItem'

class PrevActionItems extends React.Component {
  render() {

    const prev_action_items = this.props.prev_action_items.map(function(prev_action_item) {
      return(<PrevActionItem body={prev_action_item.body} color={'hsl(0, 0%, 71%)'}/>);
    });

    return (
      <div className='column component lvl2'>
        <div className='text lable'>ACTION-ITEMS</div>
        {prev_action_items}
      </div>
    )
  }
}

export default PrevActionItems
