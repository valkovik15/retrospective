import React from 'react'

class MemberList extends React.Component {
  render() {

    const members = this.props.members.map(function(member) {

      if (member.ready == true) {

      }
      return( 
        <div className='image is-48x48'>
          <img className='is-rounded' src={member.avatar_url}/> 
        </div>
      );
    });

    return (
      <div className='level-left component lvl2'>
        <div className='text lable'>MEMBER-LIST</div>
        <div className='level-item'>
          {members}
        </div>
      </div>

    )
  }   
}

export default MemberList
