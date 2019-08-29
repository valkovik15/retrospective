import React from 'react'

import Column from './Column'

class Columns extends React.Component {
  render() {

    return (
      <div className='column component lvl1'>
        <div className='text lable'>COLUMNS</div>

        <div className='columns'>
          <Column />
          <Column />
          <Column />
          <Column />
          <Column />
        </div>
      </div>
    )
  }
}

export default Columns
