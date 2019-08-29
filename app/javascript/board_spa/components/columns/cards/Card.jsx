import React from 'react'

class Card extends React.Component {
  render() {
    const { body, color, author, likes } = this.props;


    return (
      <div className='card' style={{background: color}}>
        <div className='card-body text'>{body}</div>

        <div className='level like-bar'>
          <div className='level-left image is-32x32'>
            <img className='is-rounded' src={author.avatar_url}/> 
          </div>        
        
          <div className='level-right'>
            <i className='fas fa-heart'></i>
            <span id='like-num'>{likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
