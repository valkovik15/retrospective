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
    const { deletable, times_moved } = this.props;
    const moved = (times_moved != 0);
    const footerNotEmpty = deletable || moved;

    const confirmMessage = 'Are you sure you want to delete this ActionItem?';

    return (
      <>
        {footerNotEmpty &&
          <div>
            <hr style={{margin: '0.5rem'}}/>
            <p hidden={!moved}> moved {times_moved} times! </p>
            <a onClick={() => {window.confirm(confirmMessage) && this.handleClick()}} hidden={!deletable}>
              delete
            </a>
          </div>
        }
      </>
    );
  }
}

export default ActionItemFooter
