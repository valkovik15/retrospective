import React from 'react';

import TransitionButton from '../TransitionButton';
import './ActionItemFooter.css';

class ActionItemFooter extends React.Component {
  handleDeleteClick = () => {
    fetch(`/api/${window.location.pathname}/action_items/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document
          .querySelector("meta[name='csrf-token']")
          .getAttribute('content')
      }
    })
      .then(result => {
        if (result.status === 204) {
          this.props.hideActionItem();
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

  handleMoveClick = () => {
    fetch(
      `/api/${window.location.pathname}/action_items/${this.props.id}/move`,
      {
        method: 'POST',
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

  pickColor(num) {
    switch (true) {
      case [1, 2].includes(num):
        return 'green';
      case [3].includes(num):
        return 'yellow';
      default:
        return 'red';
    }
  }

  generateChevrons = () => {
    const {times_moved} = this.props;
    const chevrons = Array.from({length: times_moved}, (_, index) => (
      <i
        key={index}
        className={`fas fa-chevron-right ${this.pickColor(times_moved)}_font`}
      />
    ));
    return chevrons;
  };

  render() {
    const {id, deletable, movable, transitionable} = this.props;
    const confirmDeleteMessage =
      'Are you sure you want to delete this ActionItem?';
    const confirmMoveMessage = 'Are you sure you want to move this ActionItem?';

    return (
      <div>
        <hr style={{margin: '0.5rem'}} />
        <div className="chevrons">{this.generateChevrons()}</div>

        {transitionable && transitionable.can_close && (
          <TransitionButton id={id} action="close" />
        )}
        {transitionable && transitionable.can_complete && (
          <TransitionButton id={id} action="complete" />
        )}
        {transitionable && transitionable.can_reopen && (
          <TransitionButton id={id} action="reopen" />
        )}
        {movable && (
          <button
            type="button"
            onClick={() => {
              window.confirm(confirmMoveMessage) && this.handleMoveClick();
            }}
          >
            move
          </button>
        )}

        <div>
          {deletable && (
            <a
              onClick={() => {
                window.confirm(confirmDeleteMessage) &&
                  this.handleDeleteClick();
              }}
            >
              delete
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default ActionItemFooter;
