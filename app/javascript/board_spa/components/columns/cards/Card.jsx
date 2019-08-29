import React from 'react'

class Card extends React.Component {
  render() {
    const { body, color } = this.props;


    return (
      <div className='card' style={{background: color}}>
        <div className='card-body'>{body}</div>
      </div>
    )
  }
}

export default Card
