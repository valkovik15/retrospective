import React from 'react'

class ActionItem extends React.Component {
  render() {
    const { body, color } = this.props;

    return (
      <div className='card' style={{background: color}}>
        <div className='card-body text'>{body}</div>
      </div>
    )
  }
}

export default ActionItem
