import React from 'react'

import { CurrentUserContext } from '../../current_user_context'

class InviteUser extends React.Component {
  render() {

    const { isMember } = this.context;

    return (
      <div className='level-left component lvl2'>
        <div className='text lable'>INVITE-USER</div>

        <div className='level-item'>
          <input className='input' type='text' placeholder='' disabled={!isMember}></input>
          <button className='button' id='invite' disabled={!isMember}>INVITE</button>
        </div>
      </div>
    )
  }   
}
InviteUser.contextType = CurrentUserContext;

export default InviteUser
