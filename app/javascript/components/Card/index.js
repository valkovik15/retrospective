import React from "react"

import CardBody from "./CardBody"
import CardFooter from "./CardFooter"
import "./Card.css"

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  hideCard = () => {
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
                    hideCard={this.hideCard}
                    avatar={avatar}/>
      </div>
    );
  }
}

export default Card
