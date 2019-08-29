import React from 'react'

import Title from './Title'
import MemberList from './MemberList'
import ButtonSet from './ButtonSet'
import InviteUser from './InviteUser'

class Header extends React.Component {
  render() {
    const { title, members } = this.props;

    return (
      <div className='component lvl1'>
        <div className='text lable'>HEADER</div>

        <Title title={title}/>
        <MemberList members={members}/>
        <InviteUser />
        <ButtonSet />
      </div>
    )
  }   
}

export default Header
