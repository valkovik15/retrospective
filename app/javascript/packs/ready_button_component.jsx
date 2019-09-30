import React from 'react'
import ReactDOM from 'react-dom'

export class ReadyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    fetch(`/api/${window.location.pathname}/memberships/ready_toggle`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      }
    })
    .then(result => result.json())
    .then(
      (result) => {
        this.setState({
          ...this.state,
          ready : result
        });
      },
    )
  }

  componentDidMount() {
    fetch(`/api/${window.location.pathname}/memberships/ready_status`, { method: 'GET' })
    .then(result => result.json())
    .then(
      (result) => {
        this.setState({
          ...this.state,
          ready : result
        });
      },
    )
  }

  render() {
    if (this.state.ready == true) {
      var className = 'button is-large is-success';
    } else {
      var className = 'button is-large';
    }
    return (
      <button className={className} onClick={this.handleClick}>READY</button>
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <ReadyButton />,
      document.getElementById('ready-button'))
})
