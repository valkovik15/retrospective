import React from 'react';

class TransitionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    fetch(
      `/api/${window.location.pathname}/action_items/${this.props.id}/${this.props.action}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': document
            .querySelector("meta[name='csrf-token']")
            .getAttribute('content')
        }
      }
    )
      .then(result => {
        if (result.status == 200) {
          window.location.reload();
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
      <button
        onClick={() => {
          this.handleClick();
        }}
      >
        {this.props.action}
      </button>
    );
  }
}

export default TransitionButton;
