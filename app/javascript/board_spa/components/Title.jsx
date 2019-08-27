import React from 'react'

class Title extends React.Component {
  render() {
    return (
      <div className='level-item'>
        <h1 className='title'>{this.props.title}</h1>
      </div>
    )
  }   
}

export default Title
