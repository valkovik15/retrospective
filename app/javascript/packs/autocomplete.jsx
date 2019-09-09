import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

export class User extends Component {
  constructor(props) {
    super(props);
    this.email = this.props.email
  };
  render () {
    return (
      <span className='tag is-info' key={this.email}>
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
      emails: [],
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
          emails: result
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
        this.setState({
          ...this.state,
          emails: [...new Set (this.state.emails.concat(result.value.email))],
          selectedOption: null
        });
      }
    ).catch((error) => {
      console.log(error)
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
      emails
    } = this.state;
    let usersListComponent;
    usersListComponent =
      emails.map((email, index) => {
        return <User email = {email}/>
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
