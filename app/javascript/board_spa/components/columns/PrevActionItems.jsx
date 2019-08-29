import React from 'react'

class PrevActionItems extends React.Component {
  render() {
    const { prev_action_items } = this.props;

    return (
      <div className='column component lvl2'>
        <div className='text lable'>PREV-ACTION-ITEMS</div>
      </div>
    )
  }
}

export default PrevActionItems
