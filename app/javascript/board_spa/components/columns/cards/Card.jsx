import React from 'react'

class Card extends React.Component {
  render() {
    const { body, color, author } = this.props;


    return (
      <div className='card' style={{background: color}}>
        <div className='card-body text'>{body}</div>

        <div className='level' style={{marginTop: '10px'}}>
          <div className='level-left image is-32x32'>
            <img className='is-rounded' src={author.avatar_url}/> 
          </div>        
        
          <span className="level-right icon">
            <i className="fas fa-heart"></i>
            <span style={{fontFamily: 'Helvetica'}}>5</span>
          </span>
        </div>
      </div>
    )
  }
}

export default Card
