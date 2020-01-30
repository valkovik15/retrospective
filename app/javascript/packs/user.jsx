import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.ready = this.props.membership.ready;
    this.email = this.props.membership.user.email;
    this.id = this.props.membership.id;
    this.state = {};
  }

  hideUser(e) {
    this.setState({
      ...this.state,
      displayStyle: {display: 'none'}
    });
  }

  deleteUser = e => {
    fetch(`/api/${window.location.pathname}/memberships/${this.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector("meta[name='csrf-token']")
          .getAttribute('content')
      }
    })
      .then(result => {
        if (result.status == 204) {
          this.hideUser();
        } else {
          throw result;
        }
      })
      .catch(error => {
        error.json().then(errorHash => {
          console.log(errorHash.error);
        });
      });
  };

  render() {
    return (
      <div
        key={this.email}
        className={this.ready ? 'tag is-success' : 'tag is-info'}
        style={this.state.displayStyle}
      >
        <p>{this.email}</p>
        <a className="delete is-small" onClick={this.deleteUser} />
      </div>
    );
  }
}

export default User;
