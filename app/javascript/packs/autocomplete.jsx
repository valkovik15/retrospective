import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

export class User extends Component {
  constructor(props) {
    super(props);
    this.ready = this.props.membership.ready
    this.email = this.props.membership.user.email
  };
  render () {
    return (
      <span className={this.ready ? 'tag is-success' : 'tag is-info'} key={this.email}>
        {this.email}
      </span>
    );
  }
};

export class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      memberships: [],
      selectedOption: null,
      options: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount = (e) => {
    fetch(`/api/${window.location.pathname}/memberships`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          ...this.state,
          memberships: result
        });
      },
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/${window.location.pathname}/invite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
      },
      body: JSON.stringify({
        board: {
          email: this.state.selectedOption.map(a => a.value).toString()
        }
      }),
    }).then((res) => {
      if (res.status == 200) {
        return res.json();
      }
      else { throw res }
    }).then (
      (result) => {
        const new_memberships = result.map(function (a) {
          return {
            user: {email: a}
          }
        });
        this.setState({
          ...this.state,
          memberships: [...new Set (this.state.memberships.concat(new_memberships))],
          selectedOption: null
        });
      }
    ).catch((error) => {
      console.log(error)
      this.setState({
          ...this.state,
         selectedOption: null
        });
       error.text().then( errorMessage => {
        console.log(errorMessage)
      })
    });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  onInputChange = e => {
    if (!e) {
      this.setState({
        ...this.state,
        options: []
      })
    }

    else {
    fetch(`/api/${window.location.pathname}/suggestions?autocomplete=${e}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ...this.state,
            suggestions: [...new Set (result.users.concat(result.teams))],
          });
          const optionsArray = this.state.suggestions.map(function (a) {
            return {
              value: a,
              label: a
            };
          });
          this.setState({
              ...this.state,
              options: optionsArray
            })
        },
      )}
  };

  render() {
    const {
      suggestions,
      memberships
    } = this.state;
    let usersListComponent;
    usersListComponent =
      memberships.map((membership, index) => {
        return <User membership = {membership}/>
      })
    const components = {
      DropdownIndicator: null,
    };
    return (
      <React.Fragment>
        <p>users on this board:</p>
        <div className="tags">
          {usersListComponent}
        </div>
        <form  onSubmit={this.handleSubmit}>

       <Select
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
        onInputChange={this.onInputChange}
        isMulti
        placeholder="Enter e-mail or team name..."
        components={components}
      />
        <input type='submit' value='Invite' />
        </form>
      </React.Fragment>
      );
  };
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Autocomplete />,
    document.getElementById('autocomplete'));
})
