import React from 'react';
import ReactDOM from 'react-dom';
import ActionCable from 'actioncable';

export class ReadyButton extends React.PureComponent {
  state = {
    isReady: false,
    id: 0
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
      .then(_ => this.sub.send({front_action: 'update_status'}));
  };

  handleMessages = data => {
    const {front_action, id} = data;
    switch (front_action) {
      case 'update_status': {
        if (id === this.state.id) {
          this.setState(state => ({
            ...state,
            isReady: !state.isReady
          }));
        }
      }
    }
  };

  componentDidMount() {
    const cable = ActionCable.createConsumer();
    this.sub = cable.subscriptions.create(
      {
        channel: 'BoardChannel',
        board: window.location.pathname.slice(
          window.location.pathname.lastIndexOf('/') + 1
        )
      },
      {
        received: this.handleMessages
      }
    );
    fetch(`/api/${window.location.pathname}/memberships/ready_status`, {
      method: 'GET'
    })
      .then(result => result.json())
      .then(result => {
        this.setState({
          isReady: result.ready,
          id: result.id
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
