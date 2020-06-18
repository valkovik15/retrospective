import React from 'react';
import {getHeaders} from '../../../utils/http';

class TransitionButton extends React.Component {
  handleClick = () => {
    fetch(
      `/api/${window.location.pathname}/action_items/${this.props.id}/${this.props.action}`,
      {
        method: 'PUT',
        headers: getHeaders()
      }
    )
      .then(result => {
        if (result.status !== 200) {
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
        type="button"
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
