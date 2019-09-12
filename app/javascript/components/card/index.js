import React from "react"

import CardBody from "./CardBody"
import CardFooter from "./CardFooter"
import "./Card.css"

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.hideCard = this.hideCard.bind(this);
  }

  hideCard() {
    this.setState({cardStyle: {display: 'none'}});
  }
  
  render () {
    const { id, body, deletable, editable, author, avatar } = this.props;

    return (
      <div className='box' style={this.state.cardStyle}>
        <CardBody id={id} 
                  editable={editable}
                  body={body}/>
        <CardFooter id={id} 
                    author={author} 
                    deletable={deletable} 
                    hideCard={this.hideCard}/>
      </div>
    );
  }
}

export default Card
