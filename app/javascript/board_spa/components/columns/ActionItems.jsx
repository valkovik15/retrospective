import React from 'react'

class ActionItems extends React.Component {
  render() {
    const { prev_action_items } = this.props;

    return (
      <div className='column component lvl2'>
        <div className='text lable'>ACTION-ITEMS</div>
      </div>
    )
  }
}

export default ActionItems
