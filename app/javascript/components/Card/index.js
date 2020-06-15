import React from 'react';

import CardBody from './CardBody';
import CardFooter from './CardFooter';
import './Card.css';

class Card extends React.Component {
  state = {
    isHidden: false
  };

  hideCard = () => {
    this.setState({isHidden: true});
  };

  render() {
    const {
      id,
      body,
      deletable,
      editable,
      author,
      avatar,
      likes,
      type,
      comments
    } = this.props;
    const {isHidden} = this.state;

    if (isHidden) {
      return null;
    }

    return (
      <div className="box">
        <CardBody id={id} editable={editable} body={body} />
        <CardFooter
          id={id}
          author={author}
          deletable={deletable}
          hideCard={this.hideCard}
          avatar={avatar}
          likes={likes}
          type={type}
          comments={comments}
        />
      </div>
    );
  }
}

export default Card;
