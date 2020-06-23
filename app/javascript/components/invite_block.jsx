import React, {Component} from 'react';
import Select from 'react-select';

import User from './user';

class InviteBlock extends Component {
  state = {
    suggestions: [],
    memberships: [],
    selectedOption: null,
    options: []
  };

  componentDidMount() {
    fetch(`/api/boards/${this.props.boardSlug}/memberships`)
      .then(res => res.json())
      .then(result => {
        this.setState((state, _) => ({
          ...state,
          memberships: result
        }));
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/boards/${this.props.boardSlug}/invite`, {
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
        this.setState(prevState => {
          return {
            ...prevState,
            memberships: [...new Set(prevState.memberships.concat(result))],
            selectedOption: null
          };
        });
      })
      .catch(error => {
        console.log(error);
        this.setState(prevState => {
          return {
            ...prevState,
            selectedOption: null
          };
        });
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
      fetch(`/api/boards/${this.props.boardSlug}/suggestions?autocomplete=${e}`)
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
      return (
        <User
          key={membership.id}
          shouldHandleDelete
          membership={membership}
          shouldDisplayReady={false}
          boardSlug={this.props.boardSlug}
        />
      );
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

export default InviteBlock;
