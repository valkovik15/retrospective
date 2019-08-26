import React from 'react'

class Board extends React.Component {

  render() {
    return (
      <div>
        <h1>THIS IS REACT BOARDSPA</h1>

        <div className='box has-text-centered'>
          <div className='level'>
  
            <div className='level-item has-text-centered'>
              <h1 className='title'>
              {this.props.json.board.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    )
  }   
}

export default Board
