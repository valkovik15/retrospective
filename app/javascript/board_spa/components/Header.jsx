import React from 'react'

import Title from './Title'
import MemberList from './MemberList'

class Header extends React.Component {
  render() {
    const { title, members } = this.props;

    return (
      <div className='box'>
        <div className='level'>

          <div className='level-left'>
            <Title title={title}/>
          </div>

          <div className='level-right'>
            <MemberList members={members}/>
          </div>
        </div>




        
      </div>
    )
  }   
}

export default Header
