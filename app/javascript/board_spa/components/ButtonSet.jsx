import React from 'react'

import { CurrentUserContext } from '../current_user_context'

class ButtonSet extends React.Component {
  render() {
    return (
      <div className='component lvl2'>
        <div className='text lable'>BUTTON-SET</div>

        <button id='join'>JOIN</button>
        <button id='leave'>LEAVE</button>
        <button id='ready'>READY</button>
      </div>
    )
  }   
}
ButtonSet.contextType = CurrentUserContext;

export default ButtonSet
