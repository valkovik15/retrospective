import React from 'react'

class Title extends React.Component {
  render() {
    return (
      <div className='level-left component lvl2'>
        <div className='text lable'>TITLE</div>

        <div className='level-item'>
          <div className='text title'>{this.props.title.toUpperCase()}</div>
        </div>
      </div>
    )
  }   
}

export default Title
