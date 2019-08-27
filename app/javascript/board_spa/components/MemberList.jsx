import React from 'react'

class MemberList extends React.Component {
  render() {
    const { members } = this.props;

    return (
      <div>
      {members.map(member => (
        <div className='tag is-info' key={member.uid}>{member.email}</div>
      ))}
      </div>
    )
  }   
}

export default MemberList
