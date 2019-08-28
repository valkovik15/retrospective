import React from 'react'

import Title from './Title'
import MemberList from './MemberList'
import ButtonSet from './ButtonSet'

class Header extends React.Component {
  render() {
    const { title, members } = this.props;

    return (
      <div className='component lvl1'>
        <div className='text lable'>HEADER</div>

        <Title title={title}/>
        <MemberList members={members}/>
        <ButtonSet />    
      </div>
    )
  }   
}

export default Header
