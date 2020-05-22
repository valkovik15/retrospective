import React from 'react';
import ReactDOM from 'react-dom';
import ActionCable from 'actioncable';

import getOrigin from '../utils/action_cable_helpers';

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
      })
      .then(_ => this.sub.send({front_action: 'update_status'}));
  };

  componentDidMount() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const cable = ActionCable.createConsumer(
      `${protocol}://${getOrigin()}${ActionCable.getConfig('url')}`
    );
    this.sub = cable.subscriptions.create(
      {
        channel: 'BoardChannel',
        board: window.location.pathname.slice(
          window.location.pathname.lastIndexOf('/') + 1
        )
      },
      {}
    );
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

  componentWillUnmount() {
    this.sub.unsubscribe();
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
