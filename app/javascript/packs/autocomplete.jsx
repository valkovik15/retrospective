import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import consumer from '../channels/consumer';

import User from './user';

export class Autocomplete extends Component {
  state = {
    suggestions: [],
    memberships: [],
    selectedOption: null,
    options: []
  };

  componentDidMount() {
    this.sub = consumer.subscriptions.create(
      {
        channel: 'BoardChannel',
        board: window.location.pathname.slice(
          window.location.pathname.lastIndexOf('/') + 1
        )
      },
      {
        received: this.handleReceiveMemberships
      }
    );
    fetch(`/api/${window.location.pathname}/memberships`)
      .then(res => res.json())
      .then(result => {
        this.setState((state, _) => ({
          ...state,
          memberships: result
        }));
      });
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  handleReceiveMemberships = data => {
    const {id, front_action, users} = data;
    switch (front_action) {
      case 'add_users': {
        this.setState((state, _) => ({
          ...state,
          memberships: [
            ...new Set(state.memberships.concat(...Object.values(users)))
          ]
        }));
        break;
      }

      case 'remove_user': {
        this.setState((state, _) => ({
          ...state,
          memberships: state.memberships.filter(el => el.id !== id)
        }));
        break;
      }

      case 'update_status': {
        const objIndex = this.state.memberships.findIndex(obj => obj.id === id);
        const updatedObj = {
          ...this.state.memberships[objIndex],
          ready: !this.state.memberships[objIndex].ready
        };
        this.setState((state, _) => ({
          ...state,
          memberships: [
            ...state.memberships.slice(0, objIndex),
            updatedObj,
            ...state.memberships.slice(objIndex + 1)
          ]
        }));
        break;
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/${window.location.pathname}/invite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector("meta[name='csrf-token']")
          .getAttribute('content')
      },
      body: JSON.stringify({
        board: {
          email: this.state.selectedOption.map(a => a.value).toString()
        }
      })
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }

        throw res;
      })
      .then(result => {
        this.setState((state, _) => ({
          ...state,
          selectedOption: null
        }));
        this.sub.send({users: {...result}, front_action: 'add_users'});
      })
      .catch(error => {
        this.setState((state, _) => ({
          ...state,
          selectedOption: null
        }));
        error.text().then(errorMessage => {
          console.log(errorMessage);
        });
      });
  };

  handleChange = selectedOption => {
    this.setState({selectedOption});
  };

  onInputChange = e => {
    if (e) {
      fetch(`/api/${window.location.pathname}/suggestions?autocomplete=${e}`)
        .then(res => res.json())
        .then(result => {
          this.setState((state, _) => ({
            ...state,
            suggestions: [...new Set(result.users.concat(result.teams))]
          }));
          const optionsArray = this.state.suggestions.map(function(a) {
            return {
              value: a,
              label: a
            };
          });
          this.setState((state, _) => ({
            ...state,
            options: optionsArray
          }));
        });
    } else {
      this.setState((state, _) => ({
        ...state,
        options: []
      }));
    }
  };

  render() {
    const {memberships} = this.state;
    const usersListComponent = memberships.map(membership => {
      return <User key={membership.id} membership={membership} />;
    });
    const components = {
      DropdownIndicator: null
    };
    return (
      <>
        <p>users on this board:</p>
        <div className="tags">{usersListComponent}</div>
        <form onSubmit={this.handleSubmit}>
          <Select
            isMulti
            value={this.state.selectedOption}
            options={this.state.options}
            placeholder="Enter e-mail or team name..."
            components={components}
            onChange={this.handleChange}
            onInputChange={this.onInputChange}
          />
          <input type="submit" value="Invite" />
        </form>
      </>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Autocomplete />, document.querySelector('#autocomplete'));
});
