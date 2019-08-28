import React from 'react'

class MemberList extends React.Component {
  render() {

    const members = this.props.members.map(function(member) {

      if (member.ready == true) {

      }
      return( 
        <div className='image'>
          <img className='is-rounded' src={member.avatar_url}/> 
        </div>
      );
    });

    return (
      <div className='level-item'>
        {members}
      </div>

    )
  }   
}

export default MemberList
