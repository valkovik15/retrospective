import React from 'react'

class Column extends React.Component {
  render() {
    const { title, cards } = this.props;

    return (
      <div className='column component lvl2'>
        <div className='text lable'>{title.toUpperCase()}</div>
      </div>
    )
  }
}

export default Column
