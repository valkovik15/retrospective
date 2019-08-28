import React from 'react'

class Title extends React.Component {
  render() {
    return (
      <div className='component lvl2'>
        <div className='text lable'>TITLE</div>
        <div className='text title'>{this.props.title.toUpperCase()}</div>
      </div>
    )
  }   
}

export default Title
