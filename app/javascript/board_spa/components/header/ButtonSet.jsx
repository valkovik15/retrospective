import React from 'react'

import { CurrentUserContext } from '../../current_user_context'

class ButtonSet extends React.Component {
  render() {

    const { isMember, ready } = this.context;

    let readyButtonClass = 'button';
    if (ready) {
      readyButtonClass += ' is-success';
    }

    return (
      <div className='level-left component lvl2'>
        <div className='text lable'>BUTTON-SET</div>

        <div className='level-item'>
          <button className='button' id='join' disabled={isMember}>JOIN</button>
          <button className='button is-danger' id='leave' disabled={!isMember}>LEAVE</button>
          <button className={readyButtonClass} id='ready' disabled={!isMember}>READY</button>
        </div>
      </div>
    )
  }   
}
ButtonSet.contextType = CurrentUserContext;

export default ButtonSet
