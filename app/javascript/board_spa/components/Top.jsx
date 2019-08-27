import React from 'react'

import Title from './Title'

class Top extends React.Component {
  render() {
    const { title, members } = this.props;

    return (
      <div className='box'>
        <div className='level'>

          <div className='level-left'>
            <Title title={title}/>
          </div>

          <div className='level-right'>
            <p>yoyo</p>
          </div>
        </div>




        
      </div>
    )
  }   
}

export default Top
