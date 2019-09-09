import React from "react"

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    
    fetch(`/api/${window.location.pathname}/cards/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      }
    }).then((result) => {
      if (result.status == 200) {
        this.props.hideCard()
      }
      else { throw result }
    }).catch((error) => {
      error.json().then( errorHash => {
        console.log(errorHash.error)
      })
    });
  }

  render () {
    return (
      <div><a href='' onClick={this.handleClick}>delete</a></div>
    );
  }
}

export default Delete
