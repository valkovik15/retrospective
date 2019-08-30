// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.props.onClick.bind(this);
    this.suggestion = this.props.suggestion
  };
  render () {
    return (
      <li className='tag is-light' key={this.suggestion} onClick={this.onClick}>
        {this.suggestion}
      </li>
    );
  }
};

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
      showSuggestions: false,
      userInput: '',
      emails: []
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  onChange = e => {
    const userInput = e.currentTarget.value;
    fetch(`/api/${window.location.pathname}/suggestions?autocomplete=${userInput}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            ...this.state,
            suggestions: result,
            showSuggestions: true,
            userInput: userInput
          });
        },
      )
  };

  onClick = (e) => {
    this.setState({
      ...this.state,
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      showSuggestions: false,
    });

    fetch(`/api/${window.location.pathname}/invite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute("content")
      },
      body: JSON.stringify({
        board: {
          email: this.state.userInput
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
          emails: this.state.emails.concat(result.email)
        });
      }
    ).catch((error) => {
       error.text().then( errorMessage => {
        console.log(errorMessage)
      })
    });
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

  render() {
    const {
      suggestions,
      showSuggestions,
      userInput,
      emails
    } = this.state;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      suggestionsListComponent =
        suggestions.map((suggestion, index) => {
          return <Suggestion suggestion = {suggestion} onClick = {this.onClick}/>
        })
    };
    let usersListComponent;
    usersListComponent =
      emails.map((email, index) => {
        return <User email = {email}/>
      })

    return (
      <React.Fragment>
        <p>users on this board:</p>
        <div className="tags">
          {usersListComponent}
        </div>
        <form  onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.onChange}
          value={userInput}
        />
        <input type='submit' value='Invite' />
        </form>
        <ul>
          {suggestionsListComponent}
        </ul>
      </React.Fragment>
      );
  };
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Autocomplete />,
    document.getElementById('autocomplete'));
})
