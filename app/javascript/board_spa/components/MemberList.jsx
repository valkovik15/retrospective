import React from 'react'

class MemberList extends React.Component {
  render() {

    const members = this.props.members.map(function(member) {
      let divStyle = {
                       height: '60px',
                       width: '60px',
                       marginLeft: '-20px',
                       padding: '4px',
                       borderRadius: '30px'
                     };
      if (member.ready == true) {
        divStyle = {...divStyle,
                     padding: '0px',
                     borderWidth: '4px',
                     borderStyle: 'solid',
                     borderColor: 'hsl(141, 71%, 48%)'
                   };
      }
      return( 
        <div className='image' style={divStyle}>
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
