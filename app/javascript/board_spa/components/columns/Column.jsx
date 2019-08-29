import React from 'react'

import Card from './cards/Card'

class Column extends React.Component {
  render() {
    const { title } = this.props;

    function matchColor(title) {
      switch(title) {
        case 'MAD': return('hsl(348, 100%, 61%)');
        case 'SAD': return('hsl(217, 71%, 53%)');
        case 'GLAD': return('hsl(141, 71%, 48%)');
      }
      //if (title == 'MAD') { return('hsl(348, 100%, 61%)'); }
      //if (title == 'SAD') { return('hsl(217, 71%, 53%)'); }
      //if (title == 'GLAD') { return('hsl(141, 71%, 48%)'); }
    }
 
    const cards = this.props.cards.map(function(card) {
      return(<Card body={card.body} abilities={card.abilities} likes={card.likes} author={card.author} color={matchColor(title)}/>);
    });

    return (
      <div className='column component lvl2'>
        <div className='text lable'>{title.toUpperCase()}</div>
        {cards}
      </div>
    )
  }
}

export default Column
