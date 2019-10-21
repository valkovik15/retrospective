import React from "react"

import "./ActionItemFooter.css"

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

  renderChevrons = () => {
    const times_moved = this.props.times_moved;
    const icon = <i className={`fas fa-chevron-right ${this.pickColor(times_moved)}`}></i>; 

    let chevrons = [];
    for (let i = 0; i < times_moved; i++) chevrons.push(icon);
    return chevrons
  };

  render () {
    const { deletable, times_moved, paintActionItem } = this.props;
    const confirmMessage = 'Are you sure you want to delete this ActionItem?';

    return (
      <div>
        <hr style={{margin: '0.5rem'}}/>
        <div className='chevrons'>{this.renderChevrons()}</div>
        <a onClick={() => {window.confirm(confirmMessage) && this.handleClick()}} hidden={!deletable}>
          delete
        </a>

        <a onClick={() => paintActionItem('yellow')}>
          clickme
        </a>
      </div>
    );
  }
}

export default ActionItemFooter
