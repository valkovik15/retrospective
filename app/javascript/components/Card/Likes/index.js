import React from "react"

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes,
      style: 'has-text-info',
      timer: null
    };
  }
  
  addLike () {
    fetch(`/api/${window.location.pathname}/cards/${this.props.id}/like`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      }
    }).then((result) => {
      if (result.status == 200) {
        result.json()
        .then((resultHash) => {
          this.setState({likes: resultHash.likes});
        })
      }
      else { 
        throw result
      }
    }).catch((error) => {
        error.json()
        .then((errorHash) => {
          console.log(errorHash.error)
        })
    });
  };

  handleMouseDown = () => {
    this.setState({style: 'has-text-success is-size-4'});
    this.addLike();
    this.state.timer = setInterval(() =>
      this.addLike()
    , 300);
  }

  handleMouseUp = () => {
    this.setState({style: 'has-text-info'});
    clearInterval(this.state.timer);
  }

  handleMouseLeave = () => {
    this.setState({style: 'has-text-info'});
    clearInterval(this.state.timer);
  }

  render () {
    const likes = this.state.likes
    return (
      <React.Fragment>
        <a className={this.state.style}
          onMouseDown={this.handleMouseDown} 
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}>
          <i className="fa fa-heart"></i>
          <span> {likes} </span>
        </a>
      </React.Fragment>
    );
  }
}

export default Likes
