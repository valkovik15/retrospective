import React from 'react'

import ActionItem from './cards/ActionItem'

class ActionItems extends React.Component {
  render() {

    const action_items = this.props.action_items.map(function(action_item) {
      return(<ActionItem body={action_item.body} color={'hsl(0, 0%, 71%)'}/>);
    });

    return (
      <div className='column component lvl2'>
        <div className='text lable'>ACTION-ITEMS</div>
        {action_items}
      </div>
    )
  }
}

export default ActionItems
