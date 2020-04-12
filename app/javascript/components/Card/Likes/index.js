import React from 'react';

const EMOJIES = {
  mad: '😡',
  sad: '😔',
  glad: '🤗'
};

class Likes extends React.PureComponent {
  state = {
    likes: this.props.likes,
    style: 'has-text-info',
    timer: null
  };

  addLike() {
    fetch(`/api/${window.location.pathname}/cards/${this.props.id}/like`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector("meta[name='csrf-token']")
          .getAttribute('content')
      }
    })
      .then(result => {
        if (result.status === 200) {
          result.json().then(resultHash => {
            this.setState({likes: resultHash.likes});
          });
        } else {
          throw result;
        }
      })
      .catch(error => {
        error.json().then(errorHash => {
          console.log(errorHash.error);
        });
      });
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
    const {type} = this.props;
    const {likes, style} = this.state;

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
