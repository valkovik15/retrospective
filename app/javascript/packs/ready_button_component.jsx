import React from 'react';
import ReactDOM from 'react-dom';

export class ReadyButton extends React.PureComponent {
  state = {
    isReady: false
  };

  handleClick = () => {
    fetch(`/api/${window.location.pathname}/memberships/ready_toggle`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector("meta[name='csrf-token']")
          .getAttribute('content')
      }
    })
      .then(result => result.json())
      .then(result => {
        this.setState({
          isReady: result
        });
      });
  };

  componentDidMount() {
    fetch(`/api/${window.location.pathname}/memberships/ready_status`, {
      method: 'GET'
    })
      .then(result => result.json())
      .then(result => {
        this.setState({
          isReady: result
        });
      });
  }

  render() {
    const {isReady} = this.state;

    return (
      <button
        className={`button is-large ${isReady ? 'is-success' : ''}`}
        type="button"
        onClick={this.handleClick}
      >
        READY
      </button>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<ReadyButton />, document.querySelector('#ready-button'));
});
