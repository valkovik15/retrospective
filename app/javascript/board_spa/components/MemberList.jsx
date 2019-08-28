import React from 'react'

class MemberList extends React.Component {
  render() {

    const members = this.props.members.map(function(member) {

      let divClass = 'avatar image is-64x64';
      if (member.ready == true) {
        divClass += ' user-ready'
      }
      
      return( 
        <div className={divClass}>
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
