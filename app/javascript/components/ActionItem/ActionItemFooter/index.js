import React from 'react';

import TransitionButton from '../TransitionButton';
import './ActionItemFooter.css';
import {getHeaders} from '../../../utils/http';

class ActionItemFooter extends React.Component {
  handleMoveClick = () => {
    fetch(
      `/api/${window.location.pathname}/action_items/${this.props.id}/move`,
      {
        method: 'POST',
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
    const {id, movable, transitionable, appointed, avatar} = this.props;

    return (
      <div>
        <hr style={{margin: '0.5rem'}} />
        <div className="chevrons">{this.generateChevrons()}</div>

        {appointed && (
          <div className="columns is-multiline">
            <div className="column is-one-quarter column-appointed">
              <img src={avatar} className="avatar" />
            </div>
            <div className="column column-appointed">
              <p> Assigned to</p>
              <p> {appointed}</p>
            </div>
          </div>
        )}

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
              window.confirm(
                'Are you sure you want to move this ActionItem?'
              ) && this.handleMoveClick();
            }}
          >
            move
          </button>
        )}
      </div>
    );
  }
}

export default ActionItemFooter;
