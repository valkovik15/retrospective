import React from "react"

class ActionItemFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {    
    fetch(`/api/${window.location.pathname}/action_items/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
      }
    }).then((result) => {
      if (result.status == 204) {
        this.props.hideActionItem()
      }
      else { throw result }
    }).catch((error) => {
      error.json().then( errorHash => {
        console.log(errorHash.error)
      })
    });
  }

  render () {
    const { deletable } = this.props;
    const confirmMessage = 'Are you sure you want to delete this ActionItem?';

    return (
      <div>
        <hr style={{margin: '0.5rem'}}/>
        <div>
          <a onClick={() => {window.confirm(confirmMessage) && this.handleClick()}}>
            delete
          </a>
        </div>
      </div>
    );
  }
}

export default ActionItemFooter
