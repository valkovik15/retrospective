import React from "react"

import TransitionButton from "../TransitionButton"
import { destroy, move } from "../requests.js"
import "./ActionItemFooter.css"

class ActionItemFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  pickColor(num) {
    switch(true) {
      case [1,2].includes(num):
        return 'green'; 
      case [3].includes(num):
        return 'yellow';
      default:
        return 'red';
    }
  }

  generateChevrons = () => {
    const times_moved = this.props.times_moved;
    const icon = <i className={`fas fa-chevron-right ${this.pickColor(times_moved)}_font`}></i>;
    const chevrons = Array.from({ length: times_moved }, () => icon)
    return chevrons
  };

  render () {
    const { id, deletable, movable, transitionable, hideActionItem } = this.props;
    const confirmDeleteMessage = 'Are you sure you want to delete this ActionItem?';
    const confirmMoveMessage = 'Are you sure you want to move this ActionItem?';

    return (
      <div>
        <hr style={{margin: '0.5rem'}}/>
        <div className='chevrons'>{this.generateChevrons()}</div>

        {transitionable && transitionable.can_close && <TransitionButton id={id} action='close'/>}
        {transitionable && transitionable.can_complete && <TransitionButton id={id} action='complete'/>}
        {transitionable && transitionable.can_reopen && <TransitionButton id={id} action='reopen'/>}
        {movable && <button onClick={() => {window.confirm(confirmMoveMessage) && move(id, window.location.reload())}}>
          move
        </button>}

        <div>
          {deletable && <a onClick={() => {window.confirm(confirmDeleteMessage) && destroy(id, hideActionItem)}}>
            delete
          </a>}
        </div>

      </div>
    );
  }
}

export default ActionItemFooter
