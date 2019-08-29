import React from 'react'

class Card extends React.Component {
  render() {
    const { body, color, author } = this.props;


    return (
      <div className='card' style={{background: color}}>
        <div className='card-body text'>{body}</div>
        
        <div className='image is-32x32'>
          <img className='is-rounded' style={{marginTop: '10px'}} src={author.avatar_url}/> 
        </div>        
        
        <span class="icon has-text-success">
          <i class="fas fa-ban"></i>
       </span>
      </div>
    )
  }
}

export default Card
