import React from 'react';

import CardBody from './CardBody';
import CardFooter from './CardFooter';
import './Card.css';

class Card extends React.Component {
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

    return (
      <div className="box">
        <CardBody
          id={id}
          editable={editable}
          deletable={deletable}
          body={body}
        />
        <CardFooter
          id={id}
          author={author}
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
