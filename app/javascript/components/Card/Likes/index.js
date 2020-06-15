import React from 'react';
import {likeCard} from '../../../utils/api';

const EMOJIES = {
  mad: '😡',
  sad: '😔',
  glad: '🤗'
};

class Likes extends React.PureComponent {
  state = {
    style: 'has-text-info',
    timer: null
  };

  addLike() {
    likeCard(this.props.id);
  }

  handleMouseDown = () => {
    this.setState({style: 'has-text-success'});
    this.addLike();
    const timer = setInterval(() => this.addLike(), 300);
    this.setState({timer});
  };

  handleMouseUp = () => {
    this.setState({style: 'has-text-info'});
    clearInterval(this.state.timer);
  };

  handleMouseLeave = () => {
    this.setState({style: 'has-text-info'});
    clearInterval(this.state.timer);
  };

  render() {
    const {type, likes} = this.props;
    const {style} = this.state;

    return (
      <>
        <a
          className={style}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        >
          {EMOJIES[type]}
        </a>
        <span> {likes} </span>
      </>
    );
  }
}

export default Likes;
