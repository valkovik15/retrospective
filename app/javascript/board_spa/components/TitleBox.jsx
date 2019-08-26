import React from 'react'

class TitleBox extends React.Component {

  render() {
    return (
      <div className='box has-text-centered'>
        <div className='level'>

          <div className='level-item has-text-centered'>
            <h1 className='title'>
              {this.props.title}
            </h1>
          </div>
        </div>
      </div>
    )
  }   
}

export default TitleBox
