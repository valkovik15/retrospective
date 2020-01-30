import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import User from './user';

export class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      memberships: [],
      selectedOption: null,
      options: []
    };
  }

  componentDidMount = e => {
    fetch(`/api/${window.location.pathname}/memberships`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          ...this.state,
          memberships: result
        });
      });
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
        if (res.status == 200) {
          return res.json();
        }

        throw res;
      })
      .then(result => {
        this.setState({
          ...this.state,
          memberships: [...new Set(this.state.memberships.concat(result))],
          selectedOption: null
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          selectedOption: null
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
    if (!e) {
      this.setState({
        ...this.state,
        options: []
      });
    } else {
      fetch(`/api/${window.location.pathname}/suggestions?autocomplete=${e}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            ...this.state,
            suggestions: [...new Set(result.users.concat(result.teams))]
          });
          const optionsArray = this.state.suggestions.map(function(a) {
            return {
              value: a,
              label: a
            };
          });
          this.setState({
            ...this.state,
            options: optionsArray
          });
        });
    }
  };

  render() {
    const {suggestions, memberships} = this.state;
    let usersListComponent;
    usersListComponent = memberships.map((membership, index) => {
      return <User membership={membership} />;
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
